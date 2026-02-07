const startChat = async (userId) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    // This hits your router.route('/').post(protect, accessChat)
    const { data } = await axios.post(`http://localhost:3000/chat`, { userId }, config);
    
    // Once chat is created/retrieved, redirect to your chat page
    console.log("Chat started:", data);
    window.location.href = "/chat"; 
  } catch (error) {
    console.error("Error starting chat", error);
  }
};