var login = require("facebook-chat-api");

var except = {};
var answeredThreads = {};

login({
    email: "findmylover.151",
    password: "s25251325" },
    function callback(err, api) {
    if(err) return console.error(err);
    api.listen(function callback(err, message) {
        console.log(message.threadID);

        // các ID facebook loại trừ, không dùng auto rep
        if (except.hasOwnProperty(message.threadID) || message.senderID==="nhập ID facebook của người đó") {
           console.log("FormID: " + message.threadID + '->Message: '+message.body);
           return;
       }

       //Khi nhận tin nhắn "STOP" của người gửi, con bot sẽ ngừng auto
       else if(message.body === "STOP") {
            console.log("FormID: " + message.threadID + '->Message: '+message.body);
            api.sendMessage("Ngừng trả lời tự động thành công", message.threadID);
            except[message.threadID] = true;
            return;
        }

        // Tắt hoàn toàn con bot này luôn (không auto rep cho ai nữa)
        else if(message.body === "STOPALL") {
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID);
			api.markAsRead(message.threadID);
			return api.logout(err);
		}

        //rep riêng theo id
        else if (message.senderID==="100009181653958" && !answeredThreads.hasOwnProperty(message.threadID)) {
            console.log("FormID: " + message.threadID + '->Message: '+message.body); //Xuất thông tin trên console, không cần quan tâm
            answeredThreads[message.threadID] = true; // Dòng này thể hiện rằng khi có người gửi tin nhắn thì bot chỉ rep 1 lần, nếu muốn con bot rep liên tục thì bỏ dòng này
			api.sendMessage("Chào bạn, mình hiện đang ko online", message.threadID);
			return;
		}

        // rep bình thường cho những người khác
        if(!answeredThreads.hasOwnProperty(message.threadID)){
            console.log("FormID: " + message.threadID + '->Message: '+message.body); //Xuất thông tin trên console, không cần quan tâm
            //answeredThreads[message.threadID] = true;// Dòng này thể hiện rằng khi có người gửi tin nhắn thì bot chỉ rep 1 lần, nếu muốn con bot rep liên tục thì bỏ dòng này
            api.sendMessage("Chào, hiện tại mình Không online,bạn nhận được tin nhắn này là do chatbot của mình trả lời tự động, mình sẽ trả lời bạn ngay khi online, hoặc gọi cho mình theo số ... à mà thôi khi nào online mình sẽ rep lại", message.threadID);
            return;
        }
    });
});
/// OK save

/*

// thay đổi từ ngữ trả lời từ tin thứ 2 (phải có dòng answeredThreads[message.threadID] = true; ở tin thứ nhất)
else if(answeredThreads.hasOwnProperty(message.threadID)){
    console.log("FormID: " + message.threadID + '->Message: '+message.body);
    api.sendMessage("Đây là tin nhắn hệ thống, đừng spam nữa nhé.\nNếu muốn dừng việc trả lời tự động, hãy gửi STOP. Cảm ơn", message.threadID);
    return;
}

Nếu muốn đánh dấu là đã đọc
    api.markAsRead(message.threadID);

*/
