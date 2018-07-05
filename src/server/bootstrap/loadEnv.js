import minimist from 'minimist';
const  args = minimist(process.argv.slice(2));
 let  ENV = args.env;

if(!ENV){
    ENV='dev'
}

export default ENV;
