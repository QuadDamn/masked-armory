const CronJob = require('cron').CronJob;
const childProcess = require('child_process');

new CronJob('0 0 23 * * *', () => {

        console.log('Starting CRON...');

        runScript('./jobs/updateAchievements.js', (err) => {
            if (err) throw err;

            console.log('Achievements Updated!');
        });

        runScript('./jobs/updateRealmList.js', (err) => {
            if (err) throw err;

            console.log('Realm Lists Updated!');
        });
    },
    null,
    true,
    'America/Los_Angeles'
);

function runScript(scriptPath, callback) {
    let invoked = false;
    let process = childProcess.fork(scriptPath);

    process.on('error', function (err) {
        if (invoked) {
            return;
        }

        invoked = true;
        callback(err);
    });

    process.on('exit', function (code) {
        if (invoked) {
            return;
        }

        invoked = true;

        let err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });
}