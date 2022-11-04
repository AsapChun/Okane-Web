import mixpanel from 'mixpanel-browser';
import auth from "./auth"
require('dotenv').config();

class MixPanel {

  constructor() {
    mixpanel.init('9505263c22e38359f8ce0f41a8421d71', {debug: true});
  }

  trackEvent(eventDescription : string) {
    mixpanel.track(eventDescription, {
      'source': "Okane Website",
    });
  }

  async setIdentity() {
    let email = await auth.getUserEmail()
    if (email) {
      mixpanel.identify(email);
      return true;
    } else {
      return false;
    }
  }
  
}

export default new MixPanel()