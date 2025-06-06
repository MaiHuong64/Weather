function checkLogin(uid, email, role) {

  console.log(uid, email, role);
  
  const guestLinks = document.getElementById("guestLinks");
  const userDropdown = document.getElementById("userDropdown");
  const userName = document.getElementById("userName");
 
  // console.log("guestLinks", guestLinks);
  // console.log("userDropdown", userDropdown);
  // console.log("userName", userName);

  if (uid === null || email === null || role === null) 
  {
    guestLinks.classList.remove("d-none");
    userDropdown.classList.add("d-none");
    return;
  } 

  if (role === "admin") 
  {
    if (window.location.pathname !== "/admin.html") 
      window.location.href = "/admin.html";
  } 
  else if( role === "user"){
    guestLinks?.classList.add("d-none");
    userDropdown?.classList.remove("d-none");
    if(userName) userName.textContent = email;
    if (window.location.pathname !== "/index.html") 
      window.location.href = "/index.html";
  }
  else
  {
    guestLinks?.classList.remove("d-none");
    userDropdown?.classList.add("d-none");
  }
};

export { checkLogin };