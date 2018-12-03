import React, {Component} from 'react';

class GaugesAnalyticsComponent extends Component {
  componentDidMount() {
    const t = document.createElement('script');
    t.type = 'text/javascript';
    t.async = true;
    t.id = 'gauges-tracker';
    t.setAttribute('data-site-id', this.props.id);
    t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');
    t.src = 'https://d2fuc4clr7gvcn.cloudfront.net/track.js';

    document.body.appendChild(t);
  }

  render() {
    return null;
  }
}

export default GaugesAnalyticsComponent;