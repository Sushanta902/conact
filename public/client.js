const socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('msg');
var msg_sec = document.getElementById('msg-section');
var active_user = document.getElementById('active_session');

let person = prompt("Please enter your name");
if (!person){
    person = "Unknown";
}
localStorage.setItem("name", person);
var name_person = localStorage.getItem("name");

var a1 = document.getElementById("a1"); 
var a2 = document.getElementById("a2"); 
var a3 = document.getElementById("a3"); 
var a4 = document.getElementById("a4"); 

form.addEventListener('submit', function(e)

{
    e.preventDefault();
    if (input.value)
    {
        a = [input.value, name_person]
        socket.emit('chatmsg', a);
        var item = document.createElement('li');
        item.innerHTML = input.value;
        item.className = "sender";
        messages.appendChild(item);
        input.value = " ";
        msg_sec.scrollTop =msg_sec.scrollHeight;

    }
});

socket.on('chatmsg',function(msg)
{
    var item = document.createElement('li');
    item.innerHTML = '<label style="user-select: none;">'+msg[1] +': </label>'+msg[0];
    item.className = "receiver";
    messages.appendChild(item);
    console.log(msg);
    a3.play();
    msg_sec.scrollTop =msg_sec.scrollHeight;

});

socket.on('conn',function(msg)
{
    var item = document.createElement('li');
    item.textContent = msg[0];
    active_user.innerHTML = "🟢"+msg[1];
    item.className = "alertmsg";
    messages.appendChild(item);
    console.log(msg);
    msg_sec.scrollTop =msg_sec.scrollHeight;
    a1.play();

});

socket.on('disconn',function(msg)
{
    var item = document.createElement('li');
    item.textContent = msg[0];
    active_user.innerHTML = "🟢"+msg[1];
    item.className = "alertmsg";
    messages.appendChild(item);
    console.log(msg);
    msg_sec.scrollTop =msg_sec.scrollHeight;
    a2.play();

});

function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }