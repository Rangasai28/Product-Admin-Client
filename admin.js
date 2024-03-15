// let url='https://product-2a888-default-rtdb.firebaseio.com/product.json';
// fetch(url,{
//     method:'POST',
//     body:JSON.stringify({
//         'name' : 'Product 2',
//         'description':'Details about Product 2',
//         'price':200,
//         'img':'url1'
//     })
// }).then((response) => {
//     console.log(response.json());
// });

const tablebodyposts = document.getElementById("bodysection");
document.addEventListener("DOMContentLoaded", () => {
  fetchPost();
});

function fetchPost() {
  fetch("https://product-2a888-default-rtdb.firebaseio.com/product.json", {
    method: "GET",
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
        // console.log(data);
      let tablerow = "";
      for (let post in data) {
        // console.log(data[post].description);
        tablerow += `<tr>
                      <td>${post}</td>
                      <td>${data[post].description}</td>
                      <td>${data[post].img}</td>
                      <td>${data[post].name}</td>
                      <td>${data[post].price}</td>
                      <td>
                      <div style='display:flex;'>
                        <button class='edit-post')'>Edit</button>
                        <button class='remove-post' id='remove'>Remove</button>
                      </div>
                      </td>
                      </tr>`;
      }
      tablebodyposts.innerHTML  = tablerow;
    });
}


const addPB = document.getElementById("add");
console.log(addPB);
addPB.addEventListener('click',(e) => {
  document.getElementById('adddatamodal').style.display = 'block';
})

const canclebutton = document.getElementById('cancle');
console.log(canclebutton);
canclebutton.addEventListener('click',(e) => {
  e.preventDefault();
  document.getElementById('adddatamodal').style.display = 'none';
})


const addproductbutton = document.getElementById('addproduct');
console.log(addproductbutton);
addproductbutton.addEventListener('click',(e) => {
  e.preventDefault();
  // console.log('addbutton is working');
  let description = document.getElementById('description').value;
  let imageurl = document.getElementById('imageurl').value;
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  fetch('https://product-2a888-default-rtdb.firebaseio.com/product.json',{
    method:'POST',
    headers:{
      "Content-Type": "application/json",
      'user': "bala"
    },
    body:JSON.stringify({
      description,
      img:imageurl,
      name,
      price
    })
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    document.getElementById('adddatamodal').style.display = 'none';
    document.getElementById('description').value = '';
    document.getElementById('imageurl').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    fetchPost();
  });
});


// // Update
// const tableEle = document.getElementById('bodysection');
// tableEle.addEventListener("click", (e) => {
//   let target = e.target;

//   if (target.classList.contains("edit-post")) {
//     document.getElementById("editmodal").style.display = "block";
//     let postid = target.parentElement.parentElement.parentElement.firstElementChild
//            .textContent;
//     // console.log(postid);
//     fetch(`https://product-2a888-default-rtdb.firebaseio.com/product.json`, {
//       method: "GET",
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((results) => {
//         console.log(typeof results);
//       //   let reqPost = results.find((result) => result.id === Number(postid));
//       //   console.log(reqPost);
//       //   populatePost(reqPost);
//       });
//   }
// });

// let populatePost = (post) => {
//   document.getElementById("description").value = post.description;
//   document.getElementById("imageurl").value = post.imageurl;
//   document.getElementById("name").value = post.name;
//   document.getElementById("price").value = post.price;
// };

// function returnId(id) {
//   console.log('button is clicked at ID:',id);
//   let postid = target.parentElement.parentElement.parentElement.firstElementChild
//   .textContent;
//   const updatebutton = document.querySelector("#updateproduct");
//   updatebutton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const descriptionupdate = document.getElementById("description").value;
//     const imageupdate = document.getElementById("imageurl").value;
//     const nameupdate = document.getElementById("name").value;
//     const priceupdate = document.getElementById("price").value;
   
  
//     fetch(`https://product-2a888-default-rtdb.firebaseio.com/product/${id}.json`,{
//         method:'PUT',
//         headers:{
//             'content-type':'application/JSON',
//             'user':'bala'
//         },
//         body:JSON.stringify({
//           description:descriptionupdate,
//           imageurl:imageupdate,
//           name:nameupdate,
//           price:priceupdate
//         })
//     }).then((response) => {
//         console.log(response.json());
//     });
//   });
// }



//delete
const tableEle = document.getElementById('bodysection');
tableEle.addEventListener("click", (e) => {
  
  let target = e.target;
  if (target.classList.contains("remove-post")) {
          
           let postid = target.parentElement.parentElement.parentElement.firstElementChild
           .textContent;
          fetch(`https://product-2a888-default-rtdb.firebaseio.com/product/${postid}.json`,{
            method:'DELETE'
          }).then((response) => {
            console.log(response.json());
            fetchPost();
          });
          
  }
});





tableEle.addEventListener('click',(e) => {
  let target = e.target;
  if(target.classList.contains('edit-post')) {
    document.getElementById("editmodal").style.display = "block";
    let postid = target.parentElement.parentElement.parentElement.firstElementChild.textContent;
    // console.log(postid);
    fetch(`https://product-2a888-default-rtdb.firebaseio.com/product.json`,{
      method:'GET'
    }).then((response) => {
      return response.json()
    }).then((data)=>{
      for(let key in data){
        fetch(`https://product-2a888-default-rtdb.firebaseio.com/product.json`,{
          method:'GET'
        }).then((response) =>{
          return response.json();
        }).then((data) =>{
          if(key === postid){
            // console.log(data[key].description);
            var desc = document.getElementById("description").value;
            desc = data[key].description;
            // console.log(desc);
           var im =  document.getElementById("imageurl").value ;
             im = data[key].img;
             var nam =  document.getElementById("name").value ;
             nam  = data[key].name;
             var pr = document.getElementById("price").value;
             pr = data[key].price;

             let udescription = document.getElementById('udescription');
             udescription.value = desc;
             let uimageurl = document.getElementById('uimageurl');
             uimageurl.value=im;
             let uname = document.getElementById('uname');
             uname.value=nam;
             let uprice =  document.getElementById('uprice');
             uprice.value = pr;

            let editprobut  =  document.getElementById('editproduct');
            //  console.log(editprobut);
            editprobut.addEventListener('click',(e) =>{
                 e.preventDefault();
                 let udescription1 = document.getElementById('udescription').value;
                 let uimageurl1 = document.getElementById('uimageurl').value;
                 let uname1 = document.getElementById('uname').value;
                 let uprice1 =  document.getElementById('uprice').value;
                //  console.log(udescription1,uimageurl1,uname1,uprice1);
                 fetch(`https://product-2a888-default-rtdb.firebaseio.com/product/${postid}.json`,{
                  method:'PUT',
                  headers:{
                    'content-type':'application/JSON',
                    'user':'bala'
                  },
                  body:JSON.stringify({
                    description:udescription1,
                    img:uimageurl1,
                    name:uname1,
                    price:uprice1
                  })
                 }).then((response) =>{
                  console.log(response.json);
                  fetchPost();
                  document.getElementById('editmodal').style.display = 'none';
                 });
            })
            
          }
        });
      }
    })
    
  }
})


const closebutton = document.getElementById('close');
console.log(closebutton);
closebutton.addEventListener('click',()=>{
   document.getElementById('editmodal').style.display = 'none';
});