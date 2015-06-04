import React from 'react';
import router from './router'

//run the router
router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
