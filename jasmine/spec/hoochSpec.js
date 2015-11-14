describe("hooch", function() {

  it("Emptier", function() {
    var emptier_div = affix('[data-emptier="true"][data-target="#my_div"]')
    var emptier_target = affix('#my_div')
    emptier_target.html('stuff')
    $('[data-emptier]').each(function(){new hooch.Emptier($(this))})
    expect(emptier_target.html()).toMatch('stuff');
    $('[data-emptier]').click()
    expect(emptier_target.html()).not.toMatch('stuff');
  });

  it("Remover", function(){
    var remover_div = affix('[data-remover="true"][data-target="#my_div"]')
    var remover_target = affix('#my_div')
    $('[data-remover]').each(function(){new hooch.Remover($(this))})
    expect($('#my_div').length).toEqual(1);
    $('[data-remover]').click();
    expect($('#my_div').length).toEqual(0);
  });

  describe("Expander",function(){
    it('expands and collapses an element', function(){
      var expander = affix('[data-expander="true"][data-expand-id="my_expander"]')
      var expandable = affix('[data-expand-state="collapsed"][data-expand-id="my_expander"]')
      $('[data-expand-state]').each(function(){new hooch.Expandable($(this))});
      expect($('[data-expand-state]').css('display')).toEqual('none');
      $('[data-expander]').click()
      expect($('[data-expand-state]').css('display')).not.toEqual('none');
      expect($('[data-expander]').css('display')).not.toEqual('none');
      $('[data-expander]').click()
      expect($('[data-expand-state]').css('display')).toEqual('none');
    })

    it('expands an element with a class and modifies trigger with an expand class', function(){
      var expander = affix('[data-expander="true"][data-expand-id="my_expander"][data-expand-class="test-class-trigger"]')
      var expandable = affix('[data-expand-state="collapsed"][data-expand-id="my_expander"][data-expand-class="test-class-content"]')
      $('[data-expand-state]').each(function(){new hooch.Expandable($(this))});
      expect($('[data-expand-state]').hasClass("test-class-content")).toBe(false);
      expect($('[data-expander]').hasClass("test-class-trigger")).toBe(false);
      $('[data-expander]').click()
      expect($('[data-expand-state]').hasClass("test-class-content")).toBe(true);
      expect($('[data-expander]').hasClass("test-class-trigger")).toBe(true);
      $('[data-expander]').click()
      expect($('[data-expand-state]').hasClass("test-class-content")).toBe(false);
      expect($('[data-expander]').hasClass("test-class-trigger")).toBe(false);
    })

    it('expands an element with a class and modifies trigger with a collapse class', function(){
      var expander = affix('[data-expander="true"][data-expand-id="my_expander"][data-collapse-class="test-class-trigger"]')
      var expandable = affix('[data-expand-state="collapsed"][data-expand-id="my_expander"][data-expand-class="test-class-content"]')
      $('[data-expand-state]').each(function(){new hooch.Expandable($(this))});
      expect($('[data-expand-state]').hasClass("test-class-content")).toBe(false);
      expect($('[data-expander]').hasClass("test-class-trigger")).toBe(true);
      $('[data-expander]').click()
      expect($('[data-expand-state]').hasClass("test-class-content")).toBe(true);
      expect($('[data-expander]').hasClass("test-class-trigger")).toBe(false);
      $('[data-expander]').click()
      expect($('[data-expand-state]').hasClass("test-class-content")).toBe(false);
      expect($('[data-expander]').hasClass("test-class-trigger")).toBe(true);
    })

    it('expands and collapses an element with separate triggers', function(){
      var expander = affix('[data-expander="true"][data-expand-id="my_expander"]')
      var collapser = affix('[data-collapser="true"][data-expand-id="my_expander"]')
      var expandable = affix('[data-expand-state="collapsed"][data-expand-id="my_expander"]')
      $('[data-expand-state]').each(function(){new hooch.Expandable($(this))});
      expect($('[data-expand-state]').css('display')).toEqual('none');
      $('[data-expander]').click()
      expect($('[data-expand-state]').css('display')).not.toEqual('none');
      expect($('[data-collapser]').css('display')).not.toEqual('none');
      expect($('[data-expander]').css('display')).toEqual('none');
      $('[data-collapser]').click()
      expect($('[data-expand-state]').css('display')).toEqual('none');
      expect($('[data-collapser]').css('display')).toEqual('none');
      expect($('[data-expander]').css('display')).not.toEqual('none');
    })
  });
  it('FakeSelect', function(){
    var fake_select = affix('[data-fake-select="color"]')
    var fake_display = fake_select.affix('[data-select-display]')
    var fake_option1 = fake_select.affix('[data-select-value="blue"][data-select-name="Blue"]')
    var fake_option2 = fake_select.affix('[data-select-value="green"][data-select-name="Green"]')
    var real_input = fake_select.affix('input[type="hidden"][data-real-select="true"]')
    $('[data-fake-select]').each(function(){new hooch.FakeSelect($(this))})
    $('[data-select-value="blue"]').click();
    expect($('[data-select-display]').html()).toEqual('Blue');
    expect($('input').val()).toEqual('blue');
    $('[data-select-value="green"]').click();
    expect($('[data-select-display]').html()).toEqual('Green');
    expect($('input').val()).toEqual('green');
  })

  it('SelectActionChanger', function(){
    var form = affix('form')
    var fake_select = form.affix('[data-select-action-changer="search"]')
    var fake_display = fake_select.affix('[data-select-display]')
    var fake_option1 = fake_select.affix('[data-select-value="pretty/url"][data-select-name="Pretty Stuff"]')
    var fake_option2 = fake_select.affix('[data-select-value="strong/url"][data-select-name="Strong Stuff"]')
    $('[data-select-action-changer]').each(function(){new hooch.SelectActionChanger($(this))})
    $('[data-select-value="pretty/url"]').click();
    expect($('[data-select-display]').html()).toEqual('Pretty Stuff');
    expect($('form').prop('action')).toMatch('pretty/url');
    $('[data-select-value="strong/url"]').click();
    expect($('[data-select-display]').html()).toEqual('Strong Stuff');
    expect($('form').prop('action')).toMatch('strong/url');
  })

  describe('Sorter',function(){
    beforeEach(function(){
      $sorter = affix('div[data-sorter][style="width: 300px;"]')
      $sort_elem_a = $sorter.affix('div#a[style="width: 100px; height: 100px; position:relative; float:left;"]')
      $sort_elem_b = $sorter.affix('div#b[style="width: 100px; height: 100px; position:relative; float:left;"]')
      $sort_elem_c = $sorter.affix('div#c[style="width: 100px; height: 100px; position:relative; float:left;"]')
      $sort_elem_d = $sorter.affix('div#d[style="width: 100px; height: 100px; position:relative; float:left;"]')

      sorter = new hooch.Sorter($sorter)
      sort_elem_a = $.grep(sorter.sort_elements, function(elem,i){
        return 'a' == elem.$sort_element.attr('id')
      })[0]
      sort_elem_b = $.grep(sorter.sort_elements, function(elem,i){
        return 'b' == elem.$sort_element.attr('id')
      })[0]
      sort_elem_c = $.grep(sorter.sort_elements, function(elem,i){
        return 'c' == elem.$sort_element.attr('id')
      })[0]
      sort_elem_d = $.grep(sorter.sort_elements, function(elem,i){
        return 'd' == elem.$sort_element.attr('id')
      })[0]
    })
    it('sets the correct sort geometry', function(){
      //The fixtures for this test float horizontally into a grid three-wide, therefore the sorter should choose a 'Grid'
      expect(sorter.mode).toEqual('Grid')
    })
    it('Handles mousedown on a sort element', function(){
      sort_elem_a.onMousedown({which: 1, originalEvent: {pageY: 10, pageX: 10}})
      //Pressing the left mouse button on a sort element sets the mousestart position
      expect(sort_elem_a.mouse_start.top).toEqual(10)
      expect(sort_elem_a.mouse_start.left).toEqual(10)
      //That initial press should also set the 'pressed' attribute
      expect(sort_elem_a.pressed).toBe(true)
      //There should be no dragging element for the sorter yet
      expect(sorter.dragging_element).toBeUndefined()

    })
    it("Handles mousedown on a drag handle if provided", function(){
      // With no drag handle specified, the entire sort element must be draggable
      expect(sort_elem_a.$drag_handle.attr('id')).toEqual('a')

      // Now set up a sorter with handles
      $sorter_with_handles = affix('div[data-sorter][style="width: 300px;"]')
      $sort_elem_with_handle = $sorter_with_handles.affix('div#handled[style="width: 100px; height: 100px; position:relative; float:left;"]')
      $sort_elem_with_handle.affix('div#the_handle[data-drag-handle]')

      sorter_with_handles = new hooch.Sorter($sorter_with_handles)
      sort_elem_with_handle = $.grep(sorter_with_handles.sort_elements, function(elem,i){
        return 'handled' == elem.$sort_element.attr('id')
      })[0]
      expect(sort_elem_with_handle.$drag_handle.attr('id')).toEqual('the_handle')
    })
    it('Handles the initial mousemove when dragging an element', function(){
      sort_elem_a.onMousedown({which: 1, originalEvent: {pageY: 10, pageX: 10}})
      sorter.onMousemove({originalEvent: {pageY: 10, pageX: 11}})
      //Starting to move the mouse will unset the pressed flag so we don't try to initialize the movement again.
      expect(sort_elem_a.pressed).toBe(false)
      //We set the dragging element for the sorter to be element 'a'
      expect(sorter.dragging_element.$sort_element.attr('id')).toEqual('a')
      //We created a placeholder for element a
      expect(sort_elem_a.placeholder.is_placeholder).toBe(true)

      var elem_before_b = sort_elem_b.$sort_element.prev()
      //The dom element for the placeholder had it's id removed to avoid duplication
      expect(elem_before_b.attr('id')).toBeUndefined()
      //The dom element for the placeholder is now in the dom just before 'b', holding the place of the real 'a' as it is being dragged
      expect(elem_before_b.is(sort_elem_a.placeholder.$sort_element)).toBe(true)
      //The real element 'a' is now attached directly to the body
      expect(sort_elem_a.$sort_element.parent()[0].nodeName).toEqual('BODY')

    })
    it('Handles mousemove when dragging an element', function(){
      sort_elem_a.onMousedown({which: 1, originalEvent: {pageY: 10, pageX: 10}})
      sorter.onMousemove({originalEvent: {pageY: 10, pageX: 110}})
      var elem_before_c = sort_elem_c.$sort_element.prev()
      //The dom element for the placeholder is now in the dom just before 'c'
      expect(elem_before_c.is(sort_elem_a.placeholder.$sort_element)).toBe(true)
      //element 'b' is now the first in line, since a has shifted one forward
      expect(sorter.$sorter.children(':first').attr('id')).toEqual('b')
    })
    it('Handles dragging below the bottom of the grid', function(){
      sort_elem_a.onMousedown({which: 1, originalEvent: {pageY: 10, pageX: 10}})
      sorter.onMousemove({originalEvent: {pageY: 210, pageX: 10}})
      last_elem = sorter.$sorter.children(':last')
      //Dragging below the bottom of the grid puts the placeholder in the last place in the list
      expect(sort_elem_a.placeholder.$sort_element.is(last_elem)).toBe(true)
    })
    it('Handles dropping an element', function(){
      sort_elem_a.onMousedown({which: 1, originalEvent: {pageY: 10, pageX: 10}})
      sorter.onMousemove({originalEvent: {pageY: 210, pageX: 10}})
      sorter.onMouseup()
      last_elem = sorter.$sorter.children(':last')
      //Now the real element 'a' is in last place after being dragged below the sorter
      expect(sort_elem_a.$sort_element.is(last_elem)).toBe(true)
    })
    it('Handles a click without a drag', function(){
      sort_elem_a.onMousedown({which: 1, originalEvent: {pageY: 10, pageX: 10}})
      sorter.onMouseup()
      expect(sorter.dragging_element).toBeUndefined()
      var pressed_element = sorter.getPressedElement()
      expect(pressed_element).toBe(false)
    })
    it('Builds form data', function(){
      sorter.$sorter.attr('data-sort-field','my_sort')
      form_data = sorter.getFormData()
      expect(form_data['sort_field']).toEqual('my_sort')
    })
  })
});
