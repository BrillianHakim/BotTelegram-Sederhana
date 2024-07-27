const TelegramBot = require("node-telegram-bot-api");

const token = "7170576374:AAGSYdOfvqm10i2nzKxd2AHMjq4PaI1zO18";

const options ={
    polling : true 
};

const uhuy = new TelegramBot(token,options);

const prefix = "."

const sayhai =  new RegExp(`^${prefix}halo$`); 
const gempa = new RegExp(`^${prefix}gempa$`);


uhuy.onText("sayhai", (callback)=>{
    uhuy.sendMessage(callback.from.id,"Hallo Juga Bos")
})

uhuy.onText(gempa,async(callback)=>{
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {
        Infogempa : {
            gempa : {
                Jam, Magnitude , Tanggal , Wilayah , Potensi, Kedalaman , Shakemap
          }
        }
    } = await apiCall.json()
    const BMKGimage = BMKG_ENDPOINT + Shakemap
    const resultText = `
Waktu : ${Tanggal} | ${Jam} 
Besaran : ${Magnitude} SR
Wilayah : ${Wilayah}
Potensi : ${Potensi}
Kedalaman : ${Kedalaman}
    `
    uhuy.sendPhoto(callback.from.id, BMKGimage,{caption:resultText})
})