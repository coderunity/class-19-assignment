const skill_list = document.querySelector('#skill_list');
const devs_view = document.querySelector('#devs_view');
const eskill_list = document.querySelector('#eskill_list');
const all_devs_data = document.querySelector('#all_devs_data');
const developerGet = document.querySelector('#developerGet');

const loads_skill = () =>{

    axios.get('http://localhost:5353/skills').then(data => {

    let skills = '';

    data.data.map(skill =>{
        skills += `
        <option value="${skill.id}">${skill.skill}</option>
        `;
    });

    skill_list.insertAdjacentHTML('beforeend', skills);


});

} 

loads_skill();

const devs_loads_skill = () =>{

    axios.get('http://localhost:5353/skills').then(data => {

    let devs = '';

    data.data.map(skill =>{
        devs += `
        <option value="${skill.id}">${skill.skill}</option>
        `;
    });

    eskill_list.insertAdjacentHTML('beforeend', devs);


});

} 

devs_loads_skill();





// developer data

all_devs_data.addEventListener('submit', function(e){

e.preventDefault();

let name = this.querySelector('#name');
let email = this.querySelector('#email');
let photo = this.querySelector('#photo');
let skill = this.querySelector('#skill_list');



if(name.value == '' || email.value == '' || photo.value == '' || skill.value == ''){
alert('all fields are requred');
}else{

    axios.post('http://localhost:5353/developer', {
        id : '',
        name : name.value,
        email : email.value,
        photo : photo.value,
        skillId : skill.value,
    }).then(res =>{
        name.value = '',
        email.value = '',
        photo.value = '',
        skill.value = ''
        developerget();
    });

        

}



});


// developer get data


const developerget = () => {

axios.get('http://localhost:5353/developer').then(res =>{
    let load_data = '';

    res.data.map((dev, index) =>{
        
        load_data += `
        <tr>
                <td>${index + 1}</td>
                <td>${dev.name}</td>
                <td>${dev.email}</td>
                <td><img style="object-fit: cover; width: 50px; height: 50px;" src="${dev.photo}" alt=""></td>
                <td>
                 <a data-bs-toggle="modal" href="#modal_view" onclick="developer_view(${dev.id})" class="btn-sm btn btn-info"><i class="fa fa-eye"></i></a>
                 <a data-bs-toggle="modal" href="#modal_edit" onclick="developerEdit(${dev.id})" class="btn-sm btn btn-warning"><i class="fa fa-edit"></i></a>
                 <a data-bs-toggle="modal" href="#modal_dalete" onclick="developerDalete(${dev.id})" class="btn-sm btn btn-danger"><i class="fa fa-trash"></i></a>
                </td>
        </tr>

        `;

    });

    developerGet.innerHTML = load_data;

});


}

developerget();


// developer edit data

function developerEdit(id){
    
    let name  = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let photo = document.getElementById('ephoto');
    let eskill_list = document.getElementById('eskill_list');
    let img_pev = document.getElementById('img_pev');
    let edit_id = document.getElementById('edit_id');

    axios.get(`http://localhost:5353/developer/${id}`).then(res =>{

        name.value = res.data.name;
        email.value = res.data.email;
        photo.value = res.data.photo;
        eskill_list.value = res.data.skillId;
        edit_id.value = id;
        img_pev.setAttribute('src', res.data.photo )

    });
}

developerEdit();

all_edit_data.addEventListener('submit', function(e){

  e.preventDefault();  
let name = this.querySelector('#ename');
let email = this.querySelector('#eemail');
let photo = this.querySelector('#ephoto');
let skill = this.querySelector('#eskill_list');
let edit_id = this.querySelector('#edit_id');

axios.patch(`http://localhost:5353/developer/${edit_id.value}`,{
    id : '',
    name : name.value,
    email : email.value,
    photo : photo.value,
    skillId : skill.value,
}).then(res => {
    name.value = '',
    email.value = '',
    photo.value = '',
    skill.value = ''
    developerget();
});



});

// developer Dalete

let remove_devs;
function developerDalete(id){

    remove_devs = id;



}

function devs_remove_data(){
   
    axios.delete(`http://localhost:5353/developer/${remove_devs}`).then( res =>{

        developerget();

    });
    
}


// developer view data

function developer_view(id) {

    const devs_view_data = document.getElementById('devs_view_data');
    const img_devs = document.getElementById('img_devs');

    axios.get(`http://localhost:5353/developer/${id}`).then(res =>{

    console.log(res.data.name);

        devs_view_data.innerHTML =`
        <tr>
            <td>${res.data.name}</td>
            <td>${res.data.email}</td>
        </tr>
        

        `;

        img_devs.setAttribute('src', res.data.photo)
        

    });



}


