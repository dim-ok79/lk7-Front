# Lk7Front

# NODE : 24.18

# Angular CLI : 22.0.0


#NPM  - разрешает установку старых пакетов
npm config set legacy-peer-deps true

#Версия Angular 
ng version

npm install @angular/build@22 @angular-devkit/build-angular@22 --save-dev


# Создание компоненты test с суфиксом через npm run
npm run g:c components/auth/test

# ИЛИ стандартно, добавил параметр в angular.json
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "type": "component"
        }


