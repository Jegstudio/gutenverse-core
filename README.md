# Gutenverse Core Documentation

## Table of contents

- [Important Notes](#important_notes)
- [Get Started](#get_started)
- [Hooks References](#hooks_ref)
- [Packages](#packages)
    - [Animation](#animations)
    - [Assets](#assets)
    - [Backend](#backend)
    - [Blocks](#blocks)
    - [Components](#components)
    - [Config](#config)
    - [Controls](#controls)
    - [Dashboard](#dashboard)
    - [Data](#data)
    - [Editor Helper](#editor_helper)
    - [Externals](#externals)
    - [Frontend](#frontend)
    - [Helper](#helper)
    - [Higher Order Components](#higher_order_)
    - [Hooks](#hooks)
    - [Icons](#icons)
    - [Requests](#requests)
    - [Router](#router)
    - [Store](#store)
    - [Toolbars](#tools)
    - [Util](#util)


---

<section id="important_notes">
<h2><a>Important Notes</a></h2>
</section>

<h3><a>Environments</a></h3>

Please use this version of node and npm in case higher versions are not compatible.
- node : v14.20.1
- npm : 6.14.17

<h3><a>Frameworks</a></h3>

Any hooks before `init` and using `init` will not be triggered inside the framework.
This is because the framework is initialized using the `init` hook it self.


---

<section id="get_started">
<h2><a>Get Started</a></h2>
</section>

<h3><a>Project Setting</a></h3>

#### jsconfig.json
```js
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "gutenverse-core/*": ["./gutenverse-core/src/*"],
        }
    },
}
```

#### .eslintrc.json 
```js 
{
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "rules": {
        "react/react-in-jsx-scope": "off",
    }
}
```

<h3><a>Building JS & CSS files</a></h3>

Open the `gutenverse-core` root folder in terminal and do `npm install` and then either `npm start` for development or `npm run build` for production.

<h3><a>Include framework files</a></h3>

Symlink or include folder framework in `gutenverse-core` to the plugin folder, then add below codes inside your plugin php file.

```php
defined( 'GUTENVERSE_FRAMEWORK_URL' ) || define( 'GUTENVERSE_FRAMEWORK_URL', plugins_url( GUTENVERSE ) . '/lib/framework' );
```

---

<section id="hooks_ref">
<h2><a>Hooks References</a></h2>
</section>

| Hook                                     | Type       | Usage
| ---------------------------------------- | ---------- | -------------
| `gutenverse_after_init_framework`        | action     | Executed after frameworks have been initialized
| `gutenverse_check_update`                | action     | Executed after meta option has been initialized
| `gutenverse_include_block`               | action     | Enqueue scripts (js/css) inside the editor
| `gutenverse_include_dashboard`           | action     | Enqueue scripts (js/css) inside the dashboard
| `gutenverse_include_frontend`            | action     | Enqueue scripts (js/css) inside the frontend
| `gutenverse_setting_toolbar`             | action     | Admin toolbar settings
| `gutenverse_column_style`                | action     | Add additional column styles
| `gutenverse_section_style`               | action     | Add additional section styles
| `gutenverse_block_config`                | filter     | Add additional config for `GutenverseConfig` object inside the editor
| `gutenverse_dashboard_config`            | filter     | Add additional config for `GutenverseDashboard` object inside the dashboard


---

<section id="packages">
<h2><a>Packages</a></h2>
</section>

<section id="animations">
<h3><a>Animation</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/animation';
```
package inside window object :
`gutenverseCore.animation`

---
<section id="assets">
<h3><a>Assets</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/assets';
```
package inside window object :
`gutenverseCore.assets`

---
<section id="backend">
<h3><a>Backend</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/backend';
```
package inside window object :
`gutenverseCore.backend`

---
<section id="blocks">
<h3><a>Blocks</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/blocks';
```
package inside window object :
`gutenverseCore.blocks`

---
<section id="components">
<h3><a>Components</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/components';
```
package inside window object :
`gutenverseCore.components`

---
<section id="config">
<h3><a>Config</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/config';
```
package inside window object :
`gutenverseCore.config`

---
<section id="controls">
<h3><a>Controls</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/controls';
```
package inside window object :
`gutenverseCore.controls`

---
<section id="dashboard">
<h3><a>Dashboard</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/dashboard';
```
package inside window object :
`gutenverseCore.dashboard`

---
<section id="data">
<h3><a>Data</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/data';
```
package inside window object :
`gutenverseCore.data`

---
<section id="editor_helper">
<h3><a>Editor Helper</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/editor-helper';
```
package inside window object :
`gutenverseCore.editorHelper`

---
<section id="externals">
<h3><a>Externals</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/externals';
```
package inside window object :
`gutenverseCore.externals`

---
<section id="frontend">
<h3><a>Frontend</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/frontend';
```
package inside window object :
`gutenverseCore.frontend`

---
<section id="helper">
<h3><a>Helper</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/helper';
```
package inside window object :
`gutenverseCore.helper`

---
<section id="higher_order_">
<h3><a>Higher Order Components</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/hoc';
```
package inside window object :
`gutenverseCore.hoc`

---
<section id="hooks">
<h3><a>Hooks</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/hooks';
```
package inside window object :
`gutenverseCore.hooks`

---
<section id="icons">
<h3><a>Icons</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/icons';
```
package inside window object :
`gutenverseCore.icons`

---
<section id="requests">
<h3><a>Requests</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/requests';
```
package inside window object :
`gutenverseCore.requests`

---
<section id="router">
<h3><a>Router</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/router';
```
package inside window object :
`gutenverseCore.router`

Components :
- `Routing` : Which is the root component that you will use to wrap your components. 
    It will pass two props (location & updateLocation) to the children component.

- `Link` : Which you will use to navigate/change the location variable.
    This component receive 5 variables:
    - location, data auto provided by the store, you don't need to change it.
    - updateLocation, data auto provided by the store, you don't need to change it.
    - to, an object contain two parameters (pathname & search)
    - className, a custom class name string
    - children, child components wrapped by Link

Variables :
- `location` : contain two sub-variables (pathname & search)
- `updateLocation` : function for updating the location variable, receive location variable.

---
<section id="store">
<h3><a>Store</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/store';
```
package inside window object :
`gutenverseCore.store`

First you need to import the store you want to use in the root component, so it will initialize the store.
After that, you can call the store by using select/dispatch.
Below are the store name list:

`gutenverse/blocklist`

is used to handle block list data

example:
```js
select('gutenverse/blocklist').getList()
```

`gutenverse/global-style`

is used to handle global variable data

example:
```js
select('gutenverse/global-style').getVariable()
```

`gutenverse/library`

is used to handle library data

example:
```js
select('gutenverse/library').getLibraryData()
```

`gutenverse/router`

this store already auto included when you use the `Routing` component, but if you need to modify it you can use this store name.

example:
```js
select('gutenverse/router').getLocation()
```

---
<section id="tools">
<h3><a>Toolbars</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/toolbars';
```
package inside window object :
`gutenverseCore.toolbars`

---
<section id="util">
<h3><a>Util</a></h3>
</section>

import example : 
```js
import * from 'gutenverse-core/util';
```
package inside window object :
`gutenverseCore.util`