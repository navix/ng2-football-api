# ng2-football-api

Simple [Angular 2](https://github.com/angular/angular) application using [Angular-CLI](https://github.com/angular/angular-cli) and [football-data.org API](http://api.football-data.org/docs/v1/index.html).

![phpstorm-nvx-one](./src/assets/screenshot.png "ng2-football-api preview")

Demo: https://navix.github.io/ng2-football-api/

## Dev

Local: `ng serve` 

## Deploy to GitHub

* `ng github-pages:deploy --message "Optional commit message"`

OR

* `ng build --prod`
* Copy `./dist` files to `gh-pages` branch root
* Update `index.html`: `<base href="/ng2-football-api/">`
* Commit & push `gh-pages` branch

## ToDo

### Features

- [x] Competition page
- [ ] Match page
- [ ] Team page
- [ ] Refresh button
- [ ] Timezone selection/detection
- [ ] "Powered by API"
- [ ] Players
- [ ] Live updates

### Dev

- [ ] Responsive
- [ ] 404
- [ ] Animations and loaders
- [ ] Logos and photos
- [ ] API Cache

### Bugfixes