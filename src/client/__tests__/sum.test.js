import chai from 'chai';
import moment from 'moment';
import sum from '../sum';
import {sha256} from 'js-sha256';
import PouchDB from 'pouchdb';
import Store from '../Store';

const db =  new PouchDB('http://jiangshan.ml:5984/jiangshan', {
        username: 'admin',
        password: 'xsq@519'
    })
let expect = chai.expect;

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).to.be.equal(3);
  });


test('注册一个新用户，用户名为simontao， 密码为xxxxxxx, 角色名为admin', (done)=>{
    let user = {
        _id: 'simontao',
        username: 'simontao',
        password: sha256('simontao112358'),
        role: 'admin',
        createdAt: new Date()
    }
    
    expect(user.password).to.not.equal("simontaos112358");
    
    db.put(user).then(ref=>{
        console.log(ref);
        done();
        
    }).catch(err => {
        for (const key in err) {
            if (err.hasOwnProperty(key)) {
                const element = err[key];
                console.log('错误', element);
            }
        }
        done();
        
    });
    db.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', (change)=> {
        // handle change
        console.log(change);
        done();
        
        
      }).on('complete', function(info) {
        // changes() was canceled
        done();
      }).on('error', function (err) {
          for (const key in err) {
              if (err.hasOwnProperty(key)) {
                  const element = err[key];
                  console.log('错误', element);
              }
          }
          done();
      });

});

test('登录用户', (done) => {
    db.get('simontao').then(doc=>{
        console.log(doc);
        let password = sha256('simontao112358');
        expect(doc.password).to.be.equal(password);
        done();

        
    }).catch(err=>{
        console.log(err);
        done();
        
    })
});


