pikaday-decorator
=================

Polymer pikaday wrapper


##Basic use:

```HTML
<pikaday-decorator>
    <input type="text" name="date1" />
</pikaday-decorator>
```

The polymer element will search and input to instanciate pikaday

##use with trigger button
```HTML
<pikaday-decorator>
    <input type="text" name="date2" />
    <button type="button" pikaday-decorator-trigger>pick</button>
</pikaday-decorator>
``

it will use [pikaday-decorator-trigger] to set the 'trigger' param of pikaday 
