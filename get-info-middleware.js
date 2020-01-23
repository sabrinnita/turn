exports.getInfoMiddleware = (req, res, next) => {
  var http = require('http');
  const { urlGetLocales } = require('./config');
  const request = require('request');
  const idRegion = req.body.idRegion;
  const idComuna = req.body.idComuna;
  const nombre = req.body.nombre;
  //Quita palabra hrs. de campo apertura y cierre
  const cleanTime = (time) => {
    return time.substring(0, 5);
  }

  const urlWithParameter = `${urlGetLocales}${idRegion}`;
  //Llamado al api
  request.get(urlWithParameter, { json: true }, (err, response, body) => {
    if (err) { return res.status(400).send(error); }
      const array = [];
      const today = new Date();
      const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      let open = '';
      let close = '';
      let pharmacy = {};
      // Filtra por comuna y nombre de local
      const result = response.body.filter(element => element.fk_comuna === idComuna &&  element.local_nombre === nombre);
      result.forEach(element => {
        open = `${cleanTime(element.funcionamiento_hora_apertura)}:00`;
        close = `${cleanTime(element.funcionamiento_hora_cierre)}:00`;
        // Revisa que la farmacia esté abierta para la hora en la que se consulta
        if (currentTime > open && currentTime < close) {
          pharmacy = {
            name: element.local_nombre,
            address: element.local_direccion,
            phone: element.local_telefono,
            lat: element.local_lat,
            long: element.local_lng
          }
          array.push(pharmacy);
         }   
      });
    return res.send(array);
  });
}