render() {
  return html`
    <div>
      ${this.users.map(user => html`
        <div class="card">
          <div class="profileIcons">
            <jha-icon-circle-plus-outline @click="${this.expandCollapseCard}">
          </div>
          <h3 class="div-center">User Profile</h3>
          <table class="container">
            <tr>
              <td>Name:</td>
              <td>${user.firstName} ${user.lastName}</td>
            </tr>
          </table>
        </div>
      `)}
    </div>
  `;
}



render() {
  return html`
  <div>
    ${(this.profileExpanded ? html `
      ${this.users.map(user => html`
        <div class="card">
          <div class="profileIcons">
            <jha-icon-circle-plus-outline @click="${this.expandCollapseCard}">
          </div>
          <h3 class="div-center">User Profile</h3>
          <table class="container">
            <tr>
              <td>Name:</td>
              <td>${user.firstName} ${user.lastName}</td>
            </tr>
          </table>
        </div>
      `)}
    ` : '')}
  </div>
  `;
}