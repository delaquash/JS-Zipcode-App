document.querySelector('#zipForm'), addEventListener('submit', getLocationInfo);

function getLocationInfo(e) {


    const zip = document.querySelector('.zip').value;

    fetch(`https://api.zippopotam.us/us/${zip}`)
        .then(response => {
            if (response.status != 200) {
                showIcon('remove');
                document.querySelector('#output').innerHTML =
                `
                <article class="message is-danger"> 
                <div class="message-body">
                Invalid Zipcode, please try again
                </div> 
                </article>
                `;
                throw Error(response.statusText);
            } else {
                showIcon('check')
                return response.json();
            }
        })
        .then(data => {
        // show location info
        let output='';
        data.places.forEach(place => {
            output += `
                <articles class="message is-primary">
                    <div class="message-header">
                    <p>Location Info</p>
                    <button class="delete"></button>
                    </div>
                    <div class="message-body">
                    <ul>
                   <li><strong>City: </strong>${place ['place name']}</li>
                   <li><strong>State: </strong>${place ['state']}</li>
                   <li><strong>Longitude: </strong>${place ['Longitude']}</li>
                   <li><strong>Latitude: </strong>${place ['latitude']}</li>
                    </ul>
                    </div>
                    </articles> 
            `;
        });
        document.querySelector('#output').innerHTML = output;
        })
        .catch(err => console.log(err));

        e.preventDefault();
    }
    
  function showIcon (icon){
    document.querySelector('.icon-remove')
    .style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';
    document.querySelector(`.icon-${icon}`)
    .style.display = 'inline-flex';
}

function deleteLocation(e){
    if(e.target.className == 'delete'){
        document.querySelector('.message').remove();
        document.querySelector('.zip').value ='';
        document.querySelector('.icon-check').remove();
    }
}