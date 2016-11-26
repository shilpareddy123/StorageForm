//create firebase reference
var dbRef = new Firebase("https://storageform.firebaseio.com/");
var contactsRef = dbRef.child('contacts')

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key(), snap.val());
//returns the first element
//(+) adds the present value along with previous value
  document.querySelector('#contacts').innerHTML += (contactHtmlFromObject(snap.val()));
});

//save contact
// addEventListener() method attaches an event handler to the specified element.
document.querySelector('.addValue').addEventListener("click", function( event ) {
  event.preventDefault();//the default action of the event will not be triggered.
//either of the feild is compulsory
  if( document.querySelector('#name').value != '' || document.querySelector('#email').value != '' ){
    contactsRef
    //contact object to add into the array 
      .push({
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        location: {
          city: document.querySelector('#city').value,
          state: document.querySelector('#state').value,
          zip: document.querySelector('#zip').value
        }
      })
      contactForm.reset();
  } else {
    alert('Please fill atleast name or email!');
  }
}, false);

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
  console.log( contact );
  var html = '';
  html += '<li class="list-group-item contact">';
    html += '<div>';
      html += '<p class="lead">'+contact.name+'</p>';
      html += '<p>'+contact.email+'</p>';
      html += '<p><small title="'+contact.location.zip+'">'+contact.location.city+', '+contact.location.state+'</small></p>';
    html += '</div>';
  html += '</li>';
  return html;
}
