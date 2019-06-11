/**
 * Created by lei_sun on 2018/2/9.
 */
import express from 'express';
import version from '../config/version';

var router = express.Router();

function showHTML(res, content){
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(content);
}

router.get('/', function(req, res) {
  showHTML(res, 'version: ' + version);
});

export default router;
