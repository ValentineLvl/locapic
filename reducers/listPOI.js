export default function(listPOI = [], action) {
    if(action.type == 'savePOI') {
        // var tempListPOI = [...listPOI, action.POI]
        return action.POI;
    } else if (action.type == 'deletePOI'){
        // var tempListPOI = listPOI.filter(e => e.latitude != action.POI.latitude && e.longitude != action.POI.longitude)
        return action.POI;
    } else {
        return listPOI;
    }
}