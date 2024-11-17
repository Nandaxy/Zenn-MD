import axios from 'axios'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return m.reply(`Gunakan format ${usedPrefix + command} <url>\n\n*Contoh :* ${usedPrefix + command} https://github.com/ShirokamiRyzen`);
    
    m.reply(wait);

    if (!text.startsWith('https://') && !text.startsWith('http://')) {
        text = 'https://' + text;
    }

    const ssweb = async (url, mode) => {
        try {
            let response = await axios.get(`https://api.ryzendesu.vip/api/tool/ssweb`, {
                params: { url, mode },
                responseType: 'arraybuffer'
            });
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    let screenshot;
    if (command === 'sshp') {
        screenshot = await ssweb(text, 'handphone');
    } else if (command === 'sspc') {
        screenshot = await ssweb(text, 'desktop');
    } else if (command === 'ssweb') {
        screenshot = await ssweb(text, 'desktop');
    } else if (command === 'ssfull') {
        screenshot = await ssweb(text, 'full');
    }

    if (!screenshot) {
        return m.reply("Gagal mengambil screenshot. Pastikan URL valid atau coba lagi nanti.");
    }

    let res = `Screenshot untuk ${text}`;

    await conn.sendMessage(m.chat, {
        image: screenshot,
        caption: res
    }, { quoted: m });
};

handler.help = ['ssweb', 'sspc', 'sshp', 'ssfull'].map(v => v + ' <url>');
handler.tags = ['internet'];
handler.command = /^(ssweb|ssfull|sspc|sshp)$/i;

handler.limit = 1
handler.register = true

export default handler