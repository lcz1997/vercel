const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'text/xml';

module.exports = async (req, res) => {
  console.log("req",req.query);
  const er = req.query.echostr
  // 将用户消息发送到现有的后端接口
  try {
    const response = await axios({
      url: "https://qg5k1dp6vq.us.aircode.run/hello",//地址替换为你的云函数地址
      method: "POST",
      params: req.query,
      data: req
    })
    console.log('res data',response.data);
    console.log('echostr',er);
    // 处理后端接口的响应，并将其返回给前端
    if(er) { 
      // 若是微信首次验签
      res.status(200).end(er);
    } else {
      res.status(200).end(response.data);
    }
  } catch (error) {
    // 处理转发请求失败的情况
    console.error(error);
    res.status(500).json({ error: '转发请求失败' });
  }
};
