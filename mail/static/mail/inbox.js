document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  
  // Form on submit
  document.querySelector('#compose-form').onsubmit= ()=>{
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;
    
    // Send data using POST
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });
  }

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails

      for(let i=0; i < Object.keys(emails).length; i++){
        const email = emails[i];
        const element = document.createElement('div');
        element.className = 'row border border-dark';
        element.addEventListener('click', ()=>{return make_it_read(email);})
        if(email.read==true){
          element.style.backgroundColor = 'grey';
        } 
        
        element.innerHTML = `<dt class="col-sm-4">${email.sender}</dt> 
        <dd class="col-sm-4">${email.subject}</dd>
        <dd class="col-sm-4" style='opacity:0.5;' >${email.timestamp}</dd>`;
        document.querySelector('#emails-view').append(element);

        
      if(mailbox!='sent'){
        const button = document.createElement('button');
        if(email.archived==true){
          button.innerHTML='Unarchive';
        }else{
          button.innerHTML='Archive';
        }
        button.className='btn btn-outline-primary'
        button.style.backgroundColor='red';
        button.style.position = 'relative';
        button.style.left = '85%';
        button.addEventListener('click', ()=>{
          archive(email);
        });
        element.append(button)
      }
      }

      
  });
  function make_it_read(email){
    fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })
    document.querySelector('#emails-view').innerHTML = `
      <div class='row'>
      <div class='col-sm-2' style='font-weight: bold;'>From:</div><div class='col-sm-10'>${email.sender}</div>
      <div class='col-sm-2' style='font-weight: bold;'>To:</div><div class='col-sm-10'>${email.recipients[0]}</div>
      <div class='col-sm-2' style='font-weight: bold;'>Subject:</div><div class='col-sm-10'>${email.subject}</div>
      <div class='col-sm-2' style='font-weight: bold;'>Timestamp:</div><div class='col-sm-10'>${email.timestamp}</div>

      <button type="button" class="btn btn-primary" id='reply'>Reply</button>
      </div>
      <hr>
      <p style='font-size:30px'>${email.body}</p>
      ` 
    document.querySelector('#reply').addEventListener('click', reply);
    function reply(){
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'block';

      // Clear out composition fields
      document.querySelector('#compose-recipients').value = email.sender;
      document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
      document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}
Your Reply:
      
      `;
    }
  }
  
}

function archive(email){
  const state = email.archived;
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: !state
    })
  })
  console.log(`Archived = ${!state}`)
}