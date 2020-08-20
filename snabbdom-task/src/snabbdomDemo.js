import {h, init} from 'snabbdom'

const patch = init([])

let vnode = h('div#container', 'hello world')

let app = document.querySelector('#app')



let data = [
        {rank: 1, title: 'Shanghai University', desc: 'from Shanghai, China'},
        {rank: 2, title: 'Beijing University', desc: 'from Shanghai, China'},
        {rank: 3, title: 'Qinghua University', desc: 'from Shanghai, China'},
        {rank: 4, title: 'Zhongshan University', desc: 'from Shanghai, China'},
        {rank: 5, title: 'Transportation University', desc: 'from Shanghai, China'},
    ]

function view(){
    return h ('div', [
        h('div', 'top 10 universities'),
        h('div', [
            h('span','Sort by'),
            h('button','Rank'),
            h('button','Title'),
            h('button','discription')
        ]),
        h('div', listView(data))
    ])
}


function listView(data){
    return h('ul', data.map(item=>{
        return h('li.university', [
            h('span', item.rank),
            h('span', item.title),
            h('span', item.desc),
        ])
    }))
}

patch(app, view())