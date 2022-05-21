import Message from "./Message"
import video from './ArkanoidVideo.mp4'
import audio from './audio.weba'
import smile from './smile.jpg'


var usersList = [
    {
        avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
    },
    {username: 'Michael',
     password: 'abcde',
     nickname: 'Michael12',
     avatar: "https://bootdey.com/img/Content/avatar/avatar1.png",
     friends: ["Elad56","Moshe45","Boaz34","Yossi90","Yaakov91"],    
     chats: [new Message("Hello", new Date().getTime(),"text","Michael12","Boaz34"),new Message("Hello", new Date().getTime(),"text","Boaz34","Michael12"),
             new Message(smile,new Date().getTime(),"image","Michael12","Moshe45"),
             new Message("Nice Smile",new Date().getTime(),"text","Moshe45","Michael12"),
             new Message("How are you",new Date().getTime(),"text","Elad56","Michael12"),
             new Message(video,new Date().getTime(),"video","Michael12","Elad56"),
             new Message(audio,new Date().getTime(),"audio","Michael12","Yossi90")],
             lastMessages: new Map([["Michael12Boaz34","Hello" + "*" + (new Date().getTime())],
                                    ["Moshe45Michael12","Nice Smile" + "*" + (new Date().getTime())],
                                    ["Michael12Elad56","A video has been sent" + "*" + (new Date().getTime())],
                                    ["Yossi90Michael12","An audio has been sent" + "*" + (new Date().getTime())],
                                    ["Yaakov91Michael12","Hello Yaakov91" + "*" + (new Date().getTime())]])
    },

    {username: 'Boaz',
     password: '12345',
     nickname: 'Boaz34',
     avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
     friends: ["Elad56","Moshe45","Michael12"],    
     chats: [new Message("Hello", new Date().getTime(),"text","Elad56","Michael12"),
            new Message("Hello", new Date().getTime(),"text","Elad56","Boaz34"),
            new Message("Hello", new Date().getTime(),"text","Michael12","Boaz34"),
            new Message("Hello", new Date().getTime(),"text","Boaz34","Michael12")],
     lastMessages: new Map([["Michael12Boaz34","Hello" + "*" + (new Date().getTime())],
                            ["Moshe45Boaz34","Hello" + "*" + (new Date().getTime())],
                            ["Elad56Boaz34","Hello" + "*" + (new Date().getTime())]])
    },

    {username: 'Moshe',
     password: 'abc',
     nickname: 'Moshe45',
     avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
     friends: ["Elad56","Boaz34", "Michael12"],    
     chats: [new Message("Hello how are you", new Date().getTime(),"text","Moshe45","Boaz34"),
            new Message("Hello", new Date().getTime(),"text","Boaz34","Moshe45"),
            new Message("Hello", new Date().getTime(),"text","Elad56","Moshe45"),
            new Message("Hello", new Date().getTime(),"text","Moshe45","Elad56"),
            new Message("Hello", new Date().getTime(),"text","Moshe45","Elad56"),
            new Message(smile,new Date().getTime(),"image","Michael12","Moshe45"),
            new Message("Nice Smile",new Date().getTime(),"text","Moshe45","Michael12")],
     lastMessages: new Map([["Moshe45Michael12","Nice Smile" + "*" + (new Date().getTime())],
                            ["Moshe45Boaz34","Hello" + "*" + (new Date().getTime())],
                            ["Moshe45Elad56","Hello" + "*" + (new Date().getTime())],
                            ["Yossi90Moshe45","Hello Moshe45" + "*" + (new Date().getTime())],
                            ["Yaakov91Moshe45","Hello" + "*" + (new Date().getTime())]])
    },

    {username: 'Elad',
     password: '12',
     nickname: 'Elad56',
     avatar: "https://bootdey.com/img/Content/avatar/avatar4.png",
     friends: ["Moshe45","Michael12"],    
     chats: [new Message("Hello", new Date().getTime(),"text","Elad56","Moshe45"),
            new Message("Hello", new Date().getTime(),"text","Moshe45","Elad56"),
            new Message("How are you",new Date().getTime(),"text","Elad56","Michael12"),
            new Message(video,new Date().getTime(),"video","Michael12","Elad56")],
     lastMessages: new Map([["Michael12Elad56","A video has been sent" + "*" + (new Date().getTime())],
                            ["Elad56Boaz34","Hello" + "*" + (new Date().getTime())],
                            ["Moshe45Elad56","Hello" + "*" + (new Date().getTime())],
                            ["Yossi90Elad56","Hello Elad56" + "*" + (new Date().getTime())]])
    },

    {username: 'Yossi',
     password: '11',
     nickname: 'Yossi90',
     avatar: "https://bootdey.com/img/Content/avatar/avatar5.png",
     friends: ["Moshe45","Michael12","Elad56"],    
     chats: [new Message("Hello Moshe45", new Date().getTime(),"text","Yossi90","Moshe45"),
            new Message("Hello Elad56", new Date().getTime(),"text","Yossi90","Elad56"),
            new Message(audio,new Date().getTime(),"audio","Michael12","Yossi90")],
     lastMessages: new Map([["Yossi90Michael12","An audio has been sent" + "*" + (new Date().getTime())],
                            ["Yossi90Moshe45","Hello Moshe45" + "*" + (new Date().getTime())],
                            ["Yossi90Elad56","Hello Elad56" + "*" + (new Date().getTime())]])
    },

    {username: 'Yaakov',
     password: '125',
     nickname: 'Yaakov91',
     avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
     friends: ["Moshe45","Michael12"],    
     chats: [new Message("Hello", new Date().getTime(),"text","Yaakov91","Moshe45"),new Message("Hello", new Date().getTime(),"text","Moshe45","Yaakov91"),
     new Message("Hello Michael12", new Date().getTime(),"text","Yaakov91","Michael12"), new Message("Hello Yaakov91", new Date().getTime(),"text","Michael12","Yaakov91")],
     lastMessages: new Map([["Yaakov91Michael12","Hello Yaakov91" + "*" + (new Date().getTime())],
                            ["Yaakov91Moshe45","Hello" + "*" + (new Date().getTime())]])
    },

    {username: '11',
     password: '125',
     nickname: '11',
     avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
     friends: ["Moshe45","Michael12"],    
     chats: [],
     lastMessages: new Map()
    },
    {username: '22',
     password: '125',
     nickname: '22',
     avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
     friends: ["Moshe45","Michael12"],    
     chats: [],
     lastMessages: new Map()
    },
    {username: '33',
     password: '125',
     nickname:'33',
     avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
     friends: ["Moshe45","Michael12"],    
     chats: [],
     lastMessages: new Map()
    },
    {username: '44',
     password: '125',
     nickname: '44',
     avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
     friends: ["Moshe45","Michael12"],    
     chats: [],
     lastMessages: new Map(),
    },
    {
       username: 'bob2',
       password: '12345',
       nickname: 'Bobby2',
       avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
       friends: ["Alicia","Bobby"],    
       chats: [],
       lastMessages: new Map(),
    },
    {
       username: 'alice',
       password: '1234',
       nickname: 'Alicia',
       avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
       friends: ["Bobby3"],    
       chats: [],
       lastMessages: new Map(),
    },
    {
       username: 'bob',
       password: '123',
       nickname: 'Bobby',
       avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
       friends: ["Bobby3"],    
       chats: [],
       lastMessages: new Map(),
    }


]

export default usersList