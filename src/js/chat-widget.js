// import MutationObserver from 'mutationobserver-shim'

const chatWidgetFrameReady = $chatWidgetFrameContainer => {
  // append charles icon as overlay to "overwrite" the default icon of the chat widget
  const $widgetIconOverlay = document.createElement('div')
  $widgetIconOverlay.className = 'c-chat-widget-overlay'
  $widgetIconOverlay.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" viewBox="0 0 204 204" overflow="visible" fill="#231f20" xmlns:v="https://vecta.io/nano"><path d="M44.1 126.2c-1.7 2.3-3.7 4.3-5.7 6.3-1.3 1.3-3 1.6-4.7.8-1.7-.7-2.5-2.1-2.5-3.4 0-1.9.6-2.9 1.6-3.8 2.9-2.6 5.3-5.7 7.1-9.2 2.3-4.5 3.4-9.3 3.4-14.4 0-7.2 1.2-14.2 3.9-20.9.8-2.1 1.9-4.2 2.9-6.3 1.1-2.3 3.7-3.1 5.8-1.9 2.1 1.1 2.9 3.7 1.7 5.9-2.4 4.6-4.2 9.4-5 14.5-.4 3-.7 5.9-.7 8.9-.2 8.7-2.7 16.5-7.8 23.5zm13 12a56.89 56.89 0 0 1-10.4 10.4c-.6.5-1.4.6-2.2.9 0-.1 0-.1-.1-.2-1.8 0-3.4-1.1-4-2.8s-.1-3.5 1.3-4.8l4.4-3.9c8-8 12.8-17.6 14.2-28.8.3-2.2.4-4.4.4-6.6.1-10.8 3.9-20.1 11.5-27.8 1.7-1.8 4.4-1.8 6.1-.1 1.7 1.6 1.8 4.3.1 6.1-3 3.1-5.3 6.5-6.9 10.5-1.5 3.7-2.1 7.5-2.2 11.5.1 13.1-4 25-12.2 35.6zm47.5-32.9c-.8 18.9-6.3 35.9-17 51.2-3.4 4.9-7.2 9.4-11.5 13.5-2.5 2.4-6.4 1.4-7.2-1.9-.4-1.6 0-3 1.2-4.2 3.4-3.3 6.4-6.8 9.2-10.6 8.1-11 13.3-23.3 15.5-36.8.8-4.7 1.1-9.5 1.2-14.2 0-1.8.9-3.1 2.6-3.8 1.6-.7 3.2-.5 4.5.7.9.8 1.4 1.8 1.4 3 .1 1.1.1 2.3.1 3.1zM30.7 107c-2.3.3-4.2-1-4.8-3.3 0-.1-.1-.2-.2-.3v-3.2l.3-3.5c1.5-18.1 8.6-33.7 21.3-46.8 1.3-1.3 2.8-1.9 4.6-1.3 1.7.6 2.7 1.8 2.9 3.6.2 1.5-.4 2.7-1.4 3.8-3.5 3.6-6.7 7.5-9.3 11.8-5.2 8.5-8.4 17.6-9.4 27.5-.3 2.4-.3 4.9-.4 7.4 0 2.1-1.5 4-3.6 4.3zm38.4-62.8c5.7-3 11.7-5.2 18-6.5 4.3-.9 8.7-1.3 13.1-1.3 2.5 0 4.4-1.8 4.4-4.3s-1.9-4.3-4.6-4.3c-8 0-15.7 1.3-23.3 3.8-4.1 1.4-8 3.1-11.8 5.1-2.5 1.3-3.1 4.3-1.4 6.5 1.3 1.7 3.5 2.1 5.6 1zm42.2 18.1c-1.6 0-3 .5-4.2 1.4v-.1c-2.5-.4-5.1-.7-7.9-.7l-6.4.8c-2.6.4-4.2 2.6-3.7 5.1.5 2.4 2.8 3.8 5.4 3.3 3.5-.7 7-.8 10.5-.2a6.91 6.91 0 0 0 6.4 4.3c3.8 0 6.9-3.1 6.9-6.9-.1-3.9-3.2-7-7-7zm0 9.9c-1.7 0-3-1.3-3-3a3.01 3.01 0 0 1 3-3 3.01 3.01 0 0 1 3 3c-.1 1.6-1.4 3-3 3zm-48.6-2.9c1.5.1 2.6-.5 3.7-1.5 5.2-5.1 11.3-8.9 18.2-11.2 2.1-.7 4.2-1.1 6.3-1.7s3.3-2.6 3-4.8c-.3-2.1-2.1-3.6-4.3-3.6h-.4c-.2 0-.3.1-.4.1-6.9 1.4-13.2 4-19.1 7.8-3.5 2.2-6.6 4.8-9.5 7.7-1.3 1.3-1.7 2.8-1.1 4.5.5 1.6 1.8 2.6 3.6 2.7zM107 45.8c-.4 0-.7-.1-1.1-.1-2.4-.2-4.3 1.6-4.5 4-.2 2.1 1.3 4 3.4 4.4l40 23.7v65.8c-3.2 1.6-5.5 4.9-5.5 8.7 0 5.3 4.3 9.7 9.7 9.7s9.7-4.3 9.7-9.7c0-3.9-2.2-7.2-5.5-8.7V73l-45.7-27-.5-.2zm42 110a3.4 3.4 0 1 1 0-6.8 3.37 3.37 0 0 1 3.4 3.4c.1 1.8-1.5 3.4-3.4 3.4zm24.1-42.1l.1-43.4-10.2-7.8v-.3c0-3.8-3.1-6.9-6.9-6.9s-6.9 3.1-6.9 6.9 3.1 6.9 6.9 6.9c.5 0 1-.1 1.5-.2l7.2 5.5-.1 39.3c-3.2 1.6-5.4 4.9-5.4 8.7 0 5.3 4.3 9.7 9.7 9.7s9.7-4.3 9.7-9.7c0-3.8-2.3-7.1-5.6-8.7zm-20-51.5c0-1.7 1.3-3 3-3a3.01 3.01 0 0 1 3 3 3.01 3.01 0 0 1-3 3 3.01 3.01 0 0 1-3-3zm15.9 63.7a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 1 1 0 6.8zm-42.8 31.2l10.2-25.8-7.8-3.1-10.9 27.5c-4 1.2-6.8 4.9-6.8 9.2 0 5.3 4.3 9.7 9.7 9.7 5.3 0 9.7-4.3 9.7-9.7-.1-3.2-1.7-6-4.1-7.8zm-5.6 11.3a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 1 1 0 6.8zM144 36.8c-2.3 0-4.4.8-6.1 2.1l-15.8-6.8-3.3 7.7 15.5 6.6c0 5.3 4.3 9.6 9.7 9.6s9.7-4.3 9.7-9.7c0-5.1-4.4-9.5-9.7-9.5zm0 13.1a3.37 3.37 0 0 1-3.4-3.4 3.4 3.4 0 1 1 6.8 0 3.37 3.37 0 0 1-3.4 3.4zm-30.3 29.6c-2.6 0-4.9 1-6.6 2.6v-.6c-3.3-1-7-1.3-10.7-.7-9.7 1.7-17.3 10.2-17.8 20.1-.2 3.3-.2 6.6-.6 9.9-1 9.3-4 17.9-8.7 25.9-3.9 6.7-8.9 12.6-14.8 17.6-2 1.7-2.2 4.4-.6 6.2s4.2 1.9 6.2.2c8.5-7.3 15.2-16 19.9-26.2 4.7-10.1 7-20.8 7.1-31.9 0-1.2.1-2.5.4-3.8 1.7-6.5 7.8-10.6 14.6-9.7.6.1 1.3.2 1.9.4.2 5.1 4.5 9.2 9.7 9.2 5.3 0 9.7-4.3 9.7-9.7 0-5.2-4.4-9.5-9.7-9.5zm0 13.1a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 1 1 0 6.8z"/><path d="M137.4 90.1c1.7-1.2 2.8-3.3 2.8-5.6 0-3.8-3.1-6.9-6.9-6.9s-6.9 3.1-6.9 6.9c0 2.2 1 4.2 2.7 5.4v19.6c-2.1 1.2-3.5 3.5-3.5 6 0 3.8 3.1 6.9 6.9 6.9s6.9-3.1 6.9-6.9c0-1.9-.7-3.5-1.9-4.8V90.1h-.1zm-4.1-8.5a3.01 3.01 0 0 1 3 3 3.01 3.01 0 0 1-3 3 3.01 3.01 0 0 1-3-3c.1-1.7 1.4-3 3-3zm-.9 37c-1.7 0-3-1.3-3-3s1.3-3 3-3a3.01 3.01 0 0 1 3 3c0 1.7-1.3 3-3 3zm-17 21.2l.6-1.2 1.8-3.7 2-19c1.9-1.2 3.1-3.4 3.1-5.8 0-3.8-3.1-6.9-6.9-6.9s-6.9 3.1-6.9 6.9c0 2.1.9 4 2.4 5.2l-1.4 13c-4.2 11.2-13.1 31.8-20.7 40.9-1.7 2-1.5 4.7.4 6.2s4.5 1.2 6.1-.8c3.5-4.2 12.8-22.3 17.7-31.6m2.4-35.8c1.7 0 3 1.3 3 3a3.01 3.01 0 0 1-3 3 3.01 3.01 0 0 1-3-3c0-1.7 1.3-3 3-3z"/></svg>'
  
  const $shadowContainer = $chatWidgetFrameContainer.querySelector('.shadow-container')
  if ($shadowContainer) {
    $shadowContainer.appendChild($widgetIconOverlay)
  } 
  //$chatWidgetFrameContainer.appendChild($widgetIconOverlay)

  // replacing the icon itself witbin the iframe dod not work yet... might be due to e.g. CSR
  /*const $chatWidgetFrame = $chatWidgetFrameContainer.querySelector('iframe')
  if ($chatWidgetFrame) {
    // actual starting point, chat widget iframe has loaded...
    const $widgetDocument = $chatWidgetFrame.contentWindow.document
    if ($widgetDocument) {
      // try to find icon and replace it with our logo
      let $widgetLogo = $widgetDocument.body.querySelector('.conversations-visitor-open-icon')
      console.log('$widgetLogo', $widgetLogo, $widgetDocument.body)

      setTimeout(() => {
        $widgetLogo = $widgetDocument.body.querySelector('.conversations-visitor-open-icon')
        console.log('$widgetLogo', $widgetLogo, $widgetDocument.body)
      }, 4000)
    }
  } */
}

const apiReady = () => {
  let $chatWidgetFrameContainer = document.getElementById('hubspot-messages-iframe-container')
  if ($chatWidgetFrameContainer) {
    chatWidgetFrameReady($chatWidgetFrameContainer)
  } else {
    // select the target node
    const target = document.body;

    // create an observer instance
    const observer = new MutationObserver(function (mutations) {
      Array.prototype.forEach.call(mutations, mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes && mutation.addedNodes.length) {
          $chatWidgetFrameContainer = Array.prototype.find.call(mutation.addedNodes, node => {
            return node.id === 'hubspot-messages-iframe-container'
          })
          if ($chatWidgetFrameContainer) {
            chatWidgetFrameReady($chatWidgetFrameContainer)
          }
        }
      })
    });

    let config = { 
      attributes: false, 
      childList: true, 
      characterData: false, 
      subtree: false, 
      attributeOldValue: false, 
      characterDataOldValue: false }

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  }
}

export default function() {
  if (window.HubSpotConversations) {
    apiReady()
  } else {
    window.hsConversationsOnReady = [apiReady]
  }
}