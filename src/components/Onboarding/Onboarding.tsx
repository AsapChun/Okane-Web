import {Component} from 'react';
import Frame1 from './OnboardingFrames/Frame1';
import Frame2 from './OnboardingFrames/Frame2';
import Frame3 from './OnboardingFrames/Frame3';
import PlaidOnboarding from './OnboardingFrames/PlaidOnboarding';
import BudgetSetup from './OnboardingFrames/BudgetSetup';
import Frame6 from './OnboardingFrames/Frame6';
import MyAccounts from './OnboardingFrames/MyAccounts';
import EndOfFirstOnboarding from './OnboardingFrames/EndOfFirstOnboarding';
import PostFirstOnboarding from './OnboardingFrames/PostFirstOnboarding';

type MyState = { 
  showHideFrame1: boolean, 
  showHideFrame2: boolean, 
  showHideFrame3: boolean,
  showEndOfFirstOnboarding: boolean,
  showPostFirstOnboarding: boolean
  showHidePlaidOnboarding: boolean,
  showHideBudgetSetup: boolean,
  showHideMyAccounts: boolean,
  showHideFrame6: boolean,
};
type Props = {
  setToken: (value: boolean) => void;
}

class Onboarding extends Component<Props, MyState> {
    constructor(props: any) {
      super(props);
      let oauth_state = localStorage.getItem("oauth_state");
      if(oauth_state === "plaid_onboarding"){
        this.state = {
          showHideFrame1: false,
          showHideFrame2: false,
          showHideFrame3: false,
          showEndOfFirstOnboarding: false,
          showPostFirstOnboarding: false,
          showHidePlaidOnboarding: true,
          showHideMyAccounts: false,
          showHideBudgetSetup: false,
          showHideFrame6: false,
        };
      } else if (oauth_state === "my_account") {
        this.state = {
          showHideFrame1: false,
          showHideFrame2: false,
          showHideFrame3: false,
          showEndOfFirstOnboarding: false,
          showPostFirstOnboarding: false,
          showHidePlaidOnboarding: false,
          showHideMyAccounts: true,
          showHideBudgetSetup: false,
          showHideFrame6: false,
        };
      } else if (oauth_state === "budget_setup_onboarding"){
        this.state = {
          showHideFrame1: false,
          showHideFrame2: false,
          showHideFrame3: false,
          showEndOfFirstOnboarding: false,
          showPostFirstOnboarding: false,
          showHidePlaidOnboarding: false,
          showHideMyAccounts: false,
          showHideBudgetSetup: true,
          showHideFrame6: false,
        };
      } else if (oauth_state === "post_first_onboarding"){
        this.state = {
          showHideFrame1: false,
          showHideFrame2: false,
          showHideFrame3: false,
          showEndOfFirstOnboarding: false,
          showPostFirstOnboarding: true,
          showHidePlaidOnboarding: false,
          showHideMyAccounts: false,
          showHideBudgetSetup: false,
          showHideFrame6: false,
        };
      } else {
        this.state = {
          showHideFrame1: true,
          showHideFrame2: false,
          showHideFrame3: false,
          showEndOfFirstOnboarding: false,
          showPostFirstOnboarding: false,
          showHidePlaidOnboarding: false,
          showHideMyAccounts: false,
          showHideBudgetSetup: false,
          showHideFrame6: false,
        };
      }
      this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent(name: string) {
        switch (name) {
          case "showHideFrame1":
            this.setState({ showHideFrame1: true })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;
          case "showHideFrame2":
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: true })
            this.setState({ showHideFrame3: false })
            this.setState({showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;
          case "showHideFrame3":
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: true })
            this.setState({showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;
          case "showEndOfFirstOnboarding":
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({showEndOfFirstOnboarding: true})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;
          case "showPostFirstOnboarding":
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({ showEndOfFirstOnboarding: false })
            this.setState({ showPostFirstOnboarding: true })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;  
          case "showHidePlaidOnboarding": //Plaid Onboarding
            localStorage.setItem("oauth_state", "plaid_onboarding");
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: true })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;
          case "showHideMyAccounts":
            localStorage.setItem("oauth_state", "my_account");
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: true });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: false })
            break;  
          case "showHideBudgetSetup":
            localStorage.setItem("oauth_state", "budget_setup_onboarding");
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: true });
            this.setState({ showHideFrame6: false })
            break;
          case "showHideFrame6":
            localStorage.removeItem("oauth_state");
            this.setState({ showHideFrame1: false })
            this.setState({ showHideFrame2: false })
            this.setState({ showHideFrame3: false })
            this.setState({ showEndOfFirstOnboarding: false})
            this.setState({ showPostFirstOnboarding: false })
            this.setState({ showHidePlaidOnboarding: false })
            this.setState({ showHideMyAccounts: false });
            this.setState({ showHideBudgetSetup: false });
            this.setState({ showHideFrame6: true })
            break;
          default:
            break;
        }
      }
  
    render() {
        const { showHideFrame1, showHideFrame2, showHideFrame3, showEndOfFirstOnboarding, showPostFirstOnboarding, showHidePlaidOnboarding: showHideFrame4, showHideMyAccounts, showHideBudgetSetup: showHideFrame5, showHideFrame6 } = this.state;
        return (
          <div>
            {showHideFrame1 && <Frame1 hideComponent={this.hideComponent}/>}
            {showHideFrame2 && <Frame2 hideComponent={this.hideComponent}/>}
            {showHideFrame3 && <Frame3 hideComponent={this.hideComponent}/>}
            {showEndOfFirstOnboarding && <EndOfFirstOnboarding hideComponent={this.hideComponent}/>}
            {showPostFirstOnboarding && <PostFirstOnboarding hideComponent={this.hideComponent}/>}
            {showHideFrame4 && <PlaidOnboarding hideComponent={this.hideComponent}/>}
            {showHideMyAccounts && <MyAccounts hideComponent={this.hideComponent}/>}
            {showHideFrame5 && <BudgetSetup hideComponent={this.hideComponent}/>}
            {showHideFrame6 && <Frame6 hideComponent={this.hideComponent}/>}
          </div>
        );
    }
}

export default Onboarding