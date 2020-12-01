var data;
var latitude = [];
var longitude = [];
var address = [];
var fullLocationList = [];
var map;
var fullLocationList = [];


function initMap() {
    //Map options
    var options = {
        zoom: 8,
        center: {lat: 30.2672, lng: -97.7431}
    }
    //new map
    map = new google.maps.Map(document.getElementById('map'), options);

    // Array of markers


    const api_url = 'https://data.austintexas.gov/resource/fmm2-ytyt.json';

    async function getCoords() {
        const response = await fetch(api_url);
        data = await response.json();
        for (i of data) {
            latitude = parseFloat(i['sr_location_lat']);
            longitude = parseFloat(i['sr_location_long']);
            address = (i['sr_location']);


            addMarker({
                coords: {lat: latitude, lng: longitude},
                content: address
            });


        }

        var $locations = $('ul#potLocations')
        $.each(fullLocationList, function (index, value) {
            $('<li class="list-group-item"><a href="#">' + value.address + '</a></li>').appendTo($locations);
        });

    }

    getCoords();



}


//Add Marker Function
function addMarker(props) {
    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,

        // icon: props.iconImage
    });

    //check for custom icon
    if (props.iconImage) {
        //set icon image
        marker.setIcon(props.iconImage);
    }
    //    check content
    if (props.content) {
        //    info window
        var infoWindow = new google.maps.InfoWindow({
            content: props.content
        });
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });


    }
    fullLocationList.push({marker: marker, address: props.content})

}

// Make a container element for the list
function filterPotholes() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('potholeInput');

    if (input != null)  {
        filter = input.value.toUpperCase();

        ul = document.getElementById("potLocations");
        li = ul.getElementsByTagName('li');


        for (i = 0; i < fullLocationList.length; i++) {
            fullLocationList[i].marker.setMap(null)
        }



// Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

        // Rebuild markers based on current li html list
        // if style display in html is set to none


            var filter_list =Array.from(li).filter(list_item => list_item.style.display !== "none")
            if (filter_list.length >= 0) {

                for (i = 0; i < filter_list.length; i++) {
                    a = filter_list[i].textContent

                    // We then take our list of addresses then compare the address string value to all
                    // map marker adddress. First one that matches return back the index number.


                    var index_num = fullLocationList.findIndex(marker_info => marker_info.address === a)

                    // Reassociate the map with the map marker.
                    fullLocationList[index_num].marker.setMap(map)

                    // https://developers.google.com/maps/documentation/javascript/examples/marker-remove



                }
            }


        }




}

filterPotholes();

