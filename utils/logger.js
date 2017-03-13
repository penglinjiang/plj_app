/**
 * created by plj on 2017/03/13
 * @author : plj
 * @Date   : 2017/03/13
 */

'use strict';

var log4js = require('log4js');
var path = require('path');

log4js.configure({
    /**这个配置是表示是否替换控制台输出.当配置文件中配置了appenders中配置了type:console的员工,
     * 并且replaceConsole:true时,代码中控制台输出(console.log  console.error)的内容将会以
     * log4js格式输出到控制台中. */
    replaceConsole : CONFIG.LOG.replaceConsole,
    /**appenders是配置文件的一级属性:它的作用是配置输出源.后续我们真正输出日志的对象就是appenders的
     * 下属子项标注的输出源 */
    appenders      : [
        /**type字段是控制日志输出对象的是什么类型的 */
        {type : 'console'},
        {
            category             : 'main',
            /**type配置为datefile表示是输出按时间分文件的日志,在此种配置下,日志会输出到目标目录下,
             * 并以时间格式命名,随着时间的推移,以时间格式命名的文件如果尚未存在,则自动创建新的文件. */
            type                 : 'dateFile',
            /**filename是一个目录加上文件名,路径就是日志文件存储的路径.
             * 此路径可以是相对路径也可以绝对路径,当是相对路径时,是相对于工程根目录.
             * 无论是相对路径还是绝对路径,路径过程中的所有文件夹必须事先手动创建好,log4js不会自动创建,如路径不存在则会报错
             */
            filename             : path.join(CONFIG.LOG.mainDir, '/log_'),
            /**这个只在type:datefile模式有效.表示一个文件的时间命名模式.在生成文件中会依照pattern配置来在filename的文件结尾追加一个时间串来命名文件 */
            pattern              : 'yyyyMMdd',
            /**这个只在type:datefile模式有效.这个是个开关配置 ture(默认值)是开启pattern,false是不开启pattern,
             * 不开启时datefile文件将无任何时间后缀,也不会分文件. */
            alwaysIncludePattern : true
        },
        {
            category             : 'warn',
            type                 : 'logLevelFilter',
            level                : "WARN",
            appender             : {
                type                 : 'dateFile',
                filename             : path.join(CONFIG.LOG.dir, 'log_warn'),
                pattern              : 'yyyyMMdd',
                alwaysIncludePattern : true,
                /**这个只在type:file模式有效.表示文件多大时才会创建下一个文件,单位是字节.
                 * 实际设置时具体的值根据业务来定,但是不推荐大于100Mb. */
                maxLogsSize          : 1024 * 1024 * 50,
            }
        },
        {
            category             : 'error',
            type                 : 'logLevelFilter',
            level                : 'ERROR',
            appender             : {
                type                 : 'dateFile',
                filename             : path.join(CONFIG.LOG.dir, 'log_err'),
                pattern              : 'yyyyMMdd',
                alwaysIncludePattern : true,
                maxLogsSize          : 1024 * 1024 * 50,
            }
        }
    ]
});

/**调用 .getLogger() 可以获得 log4js 的 Logger 实例，这个实例的用法与 console 是一致的，
 * 可以调用.debug（也有 .info、.error 等方法）来输出日志。 */
var logger = log4js.getLogger('mian');
/**其中的log等级可以进行调节，分别有：TRACE、DEBUG、INFO、WARN、ERROR、FATAL。选择某一等级之后，
 * Log只会记录当前等级及以上的日志，例如选择INFO，则只记录INFO、WARN、ERROR、FATAL。其余的信息不与记录 
 * 对于日志中的level，也可以采用auto模式，即对应不同的response_code(3XX,4XX,5XX等等)，分别对应WARN/ERROR等待。*/
logger.setLevel(CONFIG.LOG.level);

logger.log4js = log4js;

module.exports = logger;
