const socket= io()

let name;
let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.massage_area')
do {
    name = prompt('please enter your names')
} while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }
    // append
    appendmessage(msg,'outgoing')


    textarea.value=''

    scrollToButtom()
    // send to server
    socket.emit('message',msg)   //emit=>send
}
function appendmessage(msg,type){
    let maindiv= document.createElement('div')
    let className=type
    maindiv.classList.add(className,'message')

    let markup =`
    <h4> ${msg.user} </h4>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML=markup
    messagearea.appendChild(maindiv)
}

// receive massege
socket.on('message',(msg)=>{
    // console.log(msg)
    appendmessage(msg,'incoming')
    scrollToButtom()
})


function scrollToButtom(){
    messagearea.scrollTop=messagearea.scrollHeight
}