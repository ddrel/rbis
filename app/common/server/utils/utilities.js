'use strict';

var utilities = {
                parseLocation :  function(r_id){
                var municity_code = (r_id.substring(0,4) + "00000") == (r_id.substring(0,6) +"000")?"":r_id.substring(0,6) +"000";
                var region_code = r_id.substring(0,2) + "0000000";
                return {province_code:r_id.substring(0,4) + "00000",municity_code:municity_code,region_code:region_code};
                }
};


module.exports = utilities;