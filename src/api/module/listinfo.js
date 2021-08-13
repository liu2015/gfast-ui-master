import request from '@/utils/request'

// 查询listinfo列表
export function listListinfo(query) {
    return request({
        url: '/module/listinfo/list',
        method: 'get',
        params: query
    })
}

// 查询listinfo详细
export function getListinfo (id) {
    return request({
        url: '/module/listinfo/edit?id='+id,
        method: 'get'
    })
}


// 新增listinfo
export function addListinfo(data) {
    return request({
        url: '/module/listinfo/add',
        method: 'post',
        data: data
    })
}

// 修改listinfo
export function updateListinfo(data) {
    return request({
        url: '/module/listinfo/edit',
        method: 'post',
        data: data
    })
}

// 删除listinfo
export function delListinfo(ids) {
    return request({
        url: '/module/listinfo/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

