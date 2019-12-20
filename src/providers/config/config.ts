import { Injectable } from '@angular/core';

let configKeyName = "config"

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }

  constructor() {
  }

  // Recupera os dados do localStorage
  getConfigData(): any {
    return localStorage.getItem(configKeyName)
  }

  // Grava os dados do localStorage
  setConfigData(showSlide?: boolean, name?: string, username?: string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    }
    if (showSlide) {
      config.showSlide = showSlide
    }
    if (name) {
      config.name = name
    }
    if (username) {
      config.username = username
    }

    localStorage.setItem(configKeyName, JSON.stringify(config))
  }
}