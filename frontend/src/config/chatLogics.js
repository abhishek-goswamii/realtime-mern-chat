export const getSender = (loggedUser,users) => {

     const ans = users[0]._id == loggedUser._id ? users[1] : users[0];
     return ans;
  
}