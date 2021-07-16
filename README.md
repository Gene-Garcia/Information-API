# Information-API
An api to store, retrive, update, and delete any information

## Data Structure
| DATA TYPE  | FIELD NAME    | REQUIRED |
|------------|---------------|----------|
| OBJECT     | __id          | system   |
| STRING     | title         | true     |
| STRING     | desription    | true     |
| DATE       | date          | system   |
| [STRING]   | keywords      | true     |

## Usage
**Endpoint:**
 - http://openinfo-api.herokuapp.com/

### GET
**All**
 - http://openinfo-api.herokuapp.com/information

**Title**:
 - http://openinfo-api.herokuapp.com/title/some-title

**Keyword**:
 - http://openinfo-api.herokuapp.com/keyword/some-keyword

### POST
**Endpoint:**
 - http://openinfo-api.herokuapp.com/information

```
data = {
   title: 'some-title',
   description: 'some-description',
   keywords: 'some-keywords(s) in whole string seperated by ','
}
```

### PUT
**Title**:
 - http://openinfo-api.herokuapp.com/title/some-title

```
data = {
   title: 'some-new-title',
   description: 'some-new-description',
   keywords: 'some-keywords(s) in whole string seperated by ','
}
```
*Every key/field is required*

### PATCH
**Title**:
 - http://openinfo-api.herokuapp.com/title/some-title

```
data = {
   description: 'some-new-description',
}
```

*Can be any combination of field to be updated*

### DELETE
**All**
 - http://openinfo-api.herokuapp.com/information

**Title**:
 - http://openinfo-api.herokuapp.com/title/some-title
