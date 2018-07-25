import minimist from 'minimist';
const  args = minimist(process.argv.slice(2));
 let  ENV = args.env;
console.log("环境", ENV);

if(!ENV){
    ENV='dev'
}

export default ENV;
