import React, {Component} from 'react';
import ApproveButton from './ApproveButton'
import DisplayButtons from './DisplayButtons'
import ViewportButtons from './ViewportButtons'

import DisplayOptionsEnum from '../DisplayOptionEnum'
import DiffContainer from './DiffContainer'

import getFailedTests from '../getFailedTests'

import './Container.scss'

import fs from 'fs'
import Empty from "./Empty"

class Container extends Component {
  constructor(props) {
    super(props)

    let failedTests
    try {
      failedTests = getFailedTests()
    } catch (e) {
      failedTests = this.shu()
    }

    this.state = {
      failedTests: [
        ...this.setSelectedViewports(failedTests).map(a => {
          return {
            ...a,
            display: DisplayOptionsEnum.SIDE_BY_SIDE
          }
        }),
      ]
    }
    // try {
    //   this.state = {
    //     failedTests: this.setSelectedViewports(getFailedTests())
    //   }
    // } catch (e) {
    //   this.state = {
    //     failedTests: this.setSelectedViewports(this.shu())
    //   }
    // }
  }

  setSelectedViewports = failedTests =>
    failedTests.map(failedTest => {
      failedTest.viewports[0].selected = true
      return failedTest
    })

  setSelectedViewport = (failedTest, viewport) => {
    const viewports = [...failedTest.viewports].map(vp => {
      return {
        ...vp,
        selected: vp.name === viewport.name
      }
    })

    const failedTests = [...this.state.failedTests]
    const index = failedTests.indexOf(failedTest)
    failedTests.splice(index, 1, {
      ...failedTest,
      viewports
    });

    this.setState({
      failedTests
    })
  }


  shu = () => {
    return [
      {
        name: 'Cidades',
        viewports: [
          {
            name: "1920x1080",
            width: 1920,
            height: 1080,
            testImage: "https://s2.best-wallpaper.net/wallpaper/1920x1080/1508/Futuristic-city-night-lights_1920x1080.jpg",
            diffImage: "https://www.10wallpaper.com/wallpaper/1920x1080/1712/Hong_Kong_modern_architecture_night_photography_4K_HD_1920x1080.jpg",
            referenceImage: "https://media-manager.noticiasaominuto.com/1920/1535456391/naom_5b8532e98ea35.jpg"
          },
          {
            name: "1366x768",
            width: 1366,
            height: 768,
            testImage: "https://s2.best-wallpaper.net/wallpaper/1366x768/1803/Futuristic-city-fantasy-buildings-spaceships_1366x768.jpg",
            diffImage: "https://www.10wallpaper.com/wallpaper/1366x768/1601/Modern_Cities_Night_Landscape_HD_Wallpapers_1366x768.jpg",
            referenceImage: "https://www.10wallpaper.com/wallpaper/1366x768/1610/Sky_view_of_an_old_city-Cities_Corner_HD_Wallpaper_1366x768.jpg"
          }
        ]
      },
      {
        name: 'Carros',
        viewports: [
          {
            name: "1920x1080",
            width: 1920,
            height: 1080,
            testImage: "https://media-manager.noticiasaominuto.com.br/1920/1492611576/naom_58f7718612d2d.jpg",
            diffImage: "https://cdn.autopapo.com.br/box/uploads/2018/12/18151806/volkswagen-polo-e-virtus-sense-pcd1.jpg",
            referenceImage: "https://conteudo.imguol.com.br/c/entretenimento/a4/2016/05/12/fiat-1100-de-1946-de-propriedade-de-luiz-pixoxo-e-anderson-albertini-de-campinas-sp-no-10-encontro-dos-amigos-do-carro-antigo-de-jaguariuna-sp-1463106856568_1920x1080.png"
          },
          {
            name: "1366x768",
            width: 1366,
            height: 768,
            testImage: "http://planetcarsz.com/assets/uploads/b24cda49d90f521faa75eb5a42f4392d.jpg",
            diffImage: "https://carros.hi7.co/carros/carros-56653506e9dbf.jpg",
            referenceImage: "https://carrosantigos.blog.br/wp-content/uploads/carros-antigos-blog-ford-hot-rod-ano-1932.jpg"
          }
        ]
      }
    ]
  }

  changeDisplayOption = (failedTest, selectedOption) => {
    const failedTests = [...this.state.failedTests]
    const index = failedTests.indexOf(failedTest)
    failedTests.splice(index, 1, {
      ...failedTest,
      display: selectedOption
    });

    this.setState({
      failedTests
    })
  }

  approve = (failedTest, viewport) => {
    fs.copyFileSync(viewport.testImage, viewport.referenceImage)

    const failedTests = [...this.state.failedTests]
    if (failedTest.viewports.length === 1) {
      this.setState({
        failedTests: failedTests.filter(a => a.name !== failedTest.name)
      })
    } else {
      const index = failedTests.indexOf(failedTest)
      const viewports = [...failedTest.viewports]
      // failedTest.viewports = viewports.filter(a => a.name !== viewport.name)
      failedTests.splice(index, 1, {
        ...failedTest,
        viewports: viewports
          .filter(a => a.name !== viewport.name)
          .map((a, i) => {
            return {
              ...a,
              selected: i === 0
            }
          })
      });
      this.setState({
        failedTests
      })
    }
  }

  renderFailedTest = failedTest => {
    const selectedViewport = failedTest.viewports.find(a => a.selected)
    return (
      <section className='is-small'>
        <div className='card'>
          <nav className='navbar'>
            <div className='navbar-start'>
              <span className='navbar-item'>
                <span className='title is-5'>{failedTest.name}</span>
              </span>
            </div>
            <div className='navbar-end'>
              <span className='navbar-item'>
                <ApproveButton onClick={() => this.approve(failedTest, selectedViewport)}/>
              </span>
              <span className='navbar-item'>
                <DisplayButtons
                  selectedOption={failedTest.display}
                  onClick={selectedOption => this.changeDisplayOption(failedTest, selectedOption)}
                />
              </span>
              <span className='navbar-item'>
                <ViewportButtons viewports={failedTest.viewports}
                                 onClick={(vp) => this.setSelectedViewport(failedTest, vp)}/>
              </span>
            </div>
          </nav>

          <div className='card-content'>
            <DiffContainer viewport={selectedViewport} displayOption={failedTest.display}/>
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <div>
        {
          this.state.failedTests && this.state.failedTests.length > 0
            ? this.state.failedTests.map(this.renderFailedTest)
            : <Empty />
        }
      </div>
    )
  }
}

export default Container;