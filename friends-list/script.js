// JS here
(function(){
    'use strict';
    console.log('reading js');

    // Initialize Parse
    Parse.initialize("D2J4LIiIGnrzDOtXam6wfx7wzW277nWrj77JFwG0", "md2Vr7ifWS08lGccldJQS1H2NfeTV63k0mfUnXUK"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";

    const newBtn = document.querySelector('#newbtn');
    const editBtns = document.querySelectorAll('.fa-edit');
    const addFriendForm = document.querySelector('#add-friend');
    const editFriendForm = document.querySelector('#edit-friend');
    const friendList = document.querySelector('main ol');
    const inputs = document.querySelectorAll("#add-friend input:not([type=submit])");

    async function displayFriends() {
        const friends = Parse.Object.extend('Friends');
        const query = new Parse.Query(friends);

        try {
            const results = await query.ascending('lname').find();

            results.forEach( function(eachFriend) {
                const id = eachFriend.id;
                const lname = eachFriend.get('lname');
                const fname = eachFriend.get('fname');
                const email = eachFriend.get('email');
                const facebook = eachFriend.get('facebook');
                const twitter = eachFriend.get('twitter');
                const instagram = eachFriend.get('instagram');
                const linkedin = eachFriend.get('linkedin');

                // console.log(linkedin);

                const theListItem = document.createElement('li');
                theListItem.setAttribute('id', `r-${id}`);
                theListItem.innerHTML = `
                    <div class="name">
                        ${fname} ${lname}
                    </div>
                    <div class="email">
                        <i class="fas fa-envelope-square"></i> ${email}
                    </div>
                    <div class="social">
                        <a href="${facebook}"><i class="fab fa-facebook-square"></i></a>
                        <a href="${twitter}"><i class="fab fa-twitter-square"></i></a>
                        <a href="${instagram}}"><i class="fab fa-instagram"></i></a>
                        <a href="${linkedin}}"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <i class="fas fa-edit" id="e-${id}"}></i>
                    <i class="fas fa-times-circle" id="d-${id}"></i>`;

                // console.log(theListItem);
                friendList.append(theListItem);
            });
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    }
        

    displayFriends();

    

    newBtn.addEventListener('click', function(event){
        event.preventDefault();
        addFriendForm.className = 'add-friend-onscreen';
    });

    addFriendForm.addEventListener('submit', function(event){
        event.preventDefault();
        // addFriendForm.className = 'add-friend-offscreen';
        addFriend();
    });

    async function addFriend() {
        const newFriend = {};

        for (let i=0; i<inputs.length; i++) {
            let key = inputs[i].getAttribute('name');
            let value = inputs[i].value;
            newFriend[key] = value;
        }
        if (newFriend.fname != '' && newFriend.lname != '' && newFriend.email != '') {
            const  newFriendData = new Parse.Object('Friends');
            newFriendData.set('fname', newFriend.fname);
            newFriendData.set('lname', newFriend.lname);
            newFriendData.set('email', newFriend.email);
            newFriendData.set('facebook', newFriend.facebook);
            newFriendData.set('twitter', newFriend.twitter);
            newFriendData.set('instagram', newFriend.instagram);
            newFriendData.set('linkedin', newFriend.linkedin);

            try {
                const result = await newFriendData.save();
                resetFormFields();
                addFriendForm.className = 'add-friend-offscreen';
                friendList.innerHTML = '';
                displayFriends();

            } catch (error) {
                console.error('There was an error while creating friend!: ', error);
            }
            
        } else {
            addFriendForm.className = 'add-friend-offscreen';
        }
    }

    function resetFormFields() {
        document.querySelector('#fname').value = '';
        document.querySelector('#lname').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#fbook').value = 'https://www.facebook.com/';
        document.querySelector('#twitter').value = 'https://x.com/';
        document.querySelector('#insta').value = 'https://www.instagram.com/';
        document.querySelector('#linkedin').value = 'linkedin.com';
    }

    for(let i=0; i<editBtns.length; i++) {
        editBtns[i].addEventListener('click', function(event){
            event.preventDefault();
            editFriendForm.className = 'edit-friend-onscreen';
        });
    }

    editFriendForm.addEventListener('submit', function(event){
        event.preventDefault();
        editFriendForm.className = 'edit-friend-offscreen';
    })
})();