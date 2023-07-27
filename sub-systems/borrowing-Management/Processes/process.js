const logger = require ('../../../shared/src/configurations/logger.configurations')


module.exports.borrowingManagementProcesses = {
    transactBook: async (asd)=>{
        logger.info(`This is the function argument : ${asd}`);

        return asd
    },
}
