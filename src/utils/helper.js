exports.success = (message = '', data = {}, code = 200) => {
    return {
      error: false,
      message,
      data,
      code
    }
  }
  
  exports.error = (message = '', data = {}, code = 500) => {
    return {
      error: true,
      message,
      data,
      code
    }
  }
  
  exports.validation = (data = {}) => {
    return {
      error: true,
      message: 'Bad Request',
      code: 400,
      data
    }
  }
  