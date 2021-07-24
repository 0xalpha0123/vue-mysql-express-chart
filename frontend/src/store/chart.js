import machinesData from './tempdata/machinesData';
import machinesStatus from './tempdata/machinesStatus';
import timeData from './tempdata/timeData';

export default {
    namespaced: true,
    state: {
        selectedMachine: null,
        selectedMachineStatus: null,
        machinesData: machinesData,
        machinesStatus: machinesStatus,
        timeData: timeData
    },
    getters: {
        showStatus: state => {
            let _result = state.machinesStatus.filter(status => status.machineId == state.selectedMachine);
            let result = _result.sort(function(a, b) {
                if ( a.startTime < b.startTime ){
                    return -1;
                }
                if ( a.startTime > b.startTime ){
                    return 1;
                }
                return 0;
            });
            if (result.length == 0) {
                return null;
            } else {
                return result;
            }
        },
        showTimeData: state => {
            if (state.selectedMachineStatus != null) {
                let result = state.timeData.filter(data => (data.jobId == state.selectedMachineStatus && data.machineId == state.selectedMachine));
                return result;
            }
            return null;
        }
    },
    mutations: {
        selectMachine(currentState, machineId) {
            currentState.selectedMachine = machineId;
            currentState.selectedMachineStatus = null;
        },
        setSelectedMachineStatus (currentState, jobId) {
            currentState.selectedMachineStatus = jobId;
        }
    }, 
    actions: {
    }
}
