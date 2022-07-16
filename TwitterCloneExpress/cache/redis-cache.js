const Redis = require('ioredis');

class RedisCache {
    constructor() {
        this.client = new Redis({
            host : 'redis-container',
            port : 6379
        });
    }

    async getCache(key) {
        try {
            let data = await this.client.get(key);
            return this.stringToJSON(data);
        } catch (error) {
            throw error;
        }
    }

    async setCache(key, value, ttl) {
        try {
            const pipeline = this.client.pipeline();
            pipeline.set(key, JSON.stringify(value));
            pipeline.expire(key, ttl);
            pipeline.exec();
            let data = await this.client.get(key);
            return this.stringToJSON(data);
        } catch (error) {
            throw error
        }
    }

    async deleteCache(key) {
        try {
            let data = await this.client.get(key);
            if (data !== null) {
                let deleted = await this.client.del(key);
                return deleted
            }
        } catch (error) {
            throw error
        }
    }

    async insertToSortedSet(key, incr, member) {
        try {
            let set = await this.client.zincrby(key, incr, member);
            return set
        } catch (error) {
            throw error
        }
    }

    async getSortedSet(key) {
        try {
            let set = await this.client.zrange(key, -19, -1, 'WITHSCORES');
            let reverseSet = set.reverse();
            let trends = []
            for(let i = 0; i < set.length; i+=2) {
                let newSet = {}
                newSet['trend'] = reverseSet[i+1];
                newSet['count'] = Number(reverseSet[i]);
                trends.push(newSet);
            }

            return trends

        } catch (error) {
            throw error
        }
    }

    stringToJSON(obj) {
        if (obj === null) {
            return null;
        } else {
            return JSON.parse(obj);
        }
    }
}

module.exports = new RedisCache;