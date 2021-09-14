import request from '@/utils/request'

// 查询uplisttest列表
export function listUplisttest(query) {
    return request({
        url: '/module/uplisttest/list',
        method: 'get',
        params: query
    })
}

// 查询uplisttest详细
export function getUplisttest (id) {
    return request({
        url: '/module/uplisttest/edit?id='+id,
        method: 'get'
    })
}


// 新增uplisttest
export function addUplisttest(data) {
    return request({
        url: '/module/uplisttest/add',
        method: 'post',
        data: data
    })
}

// 修改uplisttest
export function updateUplisttest(data) {
    return request({
        url: '/module/uplisttest/edit',
        method: 'post',
        data: data
    })
}

// 删除uplisttest
export function delUplisttest(ids) {
    return request({
        url: '/module/uplisttest/delete',
        method: 'delete',
        data:{ids:ids}
    })
}

