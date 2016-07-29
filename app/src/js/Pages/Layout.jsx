import React from 'react'
import { Link } from 'react-router'

export default class Layout extends React.Component {
  render() {
    const aboutUsActiveClass = this.props.location.pathname.match(/^\/o-nas/) ? 'active' : ''
    const ourStoriesActiveClass = this.props.location.pathname.match(/^\/nase-pribehy/) ? 'active' : ''

    return(
      <div>
          <header>
              <nav>
                <ul>
                  <li class={aboutUsActiveClass}>
                    <Link to="o-nas">O nás</Link>
                  </li>

                  <li class={ourStoriesActiveClass}>
                    <Link to="nase-pribehy">Naše příběhy</Link>
                  </li>
                </ul>
              </nav>
          </header>

          <main>
            {this.props.children}
          </main>
      </div>
    )
  }
}
