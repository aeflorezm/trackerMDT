async function processBrazil (body) {
  try {
    
      return { operation: "SUCCESS", error: null };
    }
     catch (error) {
    return { operation: "FAILED", error: error.message };
  }
};
module.exports.CRAddRegistration = CRAddRegistration;
