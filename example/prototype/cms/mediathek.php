<h2>Mediathek</h2>

<style type="text/css" >

.wgt-mediathek{
  position:absolute;
}

.wgt-mediathek h2.head,
.wgt-mediathek h3.head
{
  width:120px;
  float:left;
  text-align:left;
}

</style>

<?php 

$key = 'thek1';
$editorId = 'wgt-wysiwyg-cms';

$images = array
(
  array
  (
    'src'   => '../files/images/thumb_small.jpg',
    'name'  => 'fubar.jpg',
    'type'  => 'Portrait',
    'title' => 'Hans',
    'label' => 'Wurst',
    'author' => 'Ollum',
    'created' => '2012-12-12 13:01:23',
    'licence' => 'Commons',
    'description' => 'jaja soso jaja, mhm...',
    'dimensions' => array
    (
      '100x200'   => array( 'small', '../files/images/thumb_small.jpg' ),
      '1000x2000' => array( 'original', '../files/images/thumb_small.jpg' ),
    )
  ),
  array
  (
    'src'   => '../files/images/thumb_small.jpg',
    'name'  => 'fubar.jpg',
    'type'  => 'Portrait',
    'title' => 'Hans',
    'label' => 'Wurst',
    'author' => 'Ollum',
    'created' => '2012-12-12 13:01:23',
    'licence' => 'Commons',
    'description' => 'jaja soso jaja, mhm...',
    'dimensions' => array
    (
      '100x200'   => array( 'small', '../files/images/thumb_small.jpg' ),
      '1000x2000' => array( 'original', '../files/images/thumb_small.jpg' ),
    )
  ),
  array
  (
    'src'   => '../files/images/thumb_small.jpg',
    'name'  => 'fubar.jpg',
    'type'  => 'Portrait',
    'title' => 'Hans',
    'label' => 'Wurst',
    'author' => 'Ollum',
    'created' => '2012-12-12 13:01:23',
    'licence' => 'Commons',
    'description' => 'jaja soso jaja, mhm...',
    'dimensions' => array
    (
      '100x200'   => array( 'small', '../files/images/thumb_small.jpg' ),
      '1000x2000' => array( 'original', '../files/images/thumb_small.jpg' ),
    )
  ),
);

?>

<div class="wgt-mediathek" id="wgt-mediathek-<?php echo $key ?>" >

  <!-- Start Mediathek -->
  <div id="wgt-tab-mediathek-project_data" class="wcm wcm_ui_tab wgt-border wgt-corner-top bw7 wgt-space"  >
    <div id="wgt-tab-mediathek-project_data-head" class="wgt_tab_head wgt-corner-top" >
      <div class="wgt-container-controls">
        <div class="left">
          <h2 class="head"  >Mediathek</h2>
          <div class="inline" >
            <select class="wcm wcm_widget_selectbox medium" >
              <option>Thek 1</option>
              <option>Thek 2</option>
            </select>
          </div>
        </div>
        <div class="tab_outer_container">
          <div class="tab_scroll" >
            <div class="tab_container"></div>
          </div>
       </div>
      </div>
    </div>
    <div id="wgt-tab-mediathek-project_data-body" class="wgt_tab_body" >
    
      <div id="wgt-tab-mediathek-project_data-image"  title="Images (1)"  class="wgt_tab bh42 wgt-tab-mediathek-project_data">
        <div class="wgt-panel title" >
          <h3 class="head" >Images</h3>
          <div class="inline" >
            <button class="wcm wcm_ui_dropform wgt-button" id="wgt-dropform-upload-image-<?php echo $key; ?>" >Upload</button>

              <div class="wgt-dropform-upload-image-<?php echo $key; ?> hidden"  >
              
                <div style="width:100%;height:400px;"  >
                  <div class="wgt-panel title" >
                    <h2>Upload a new Image</h2>
                  </div>
                  
                    <form 
                      method="post"
                      id="wgt-form-image-cms_mediathek-<?php echo $key ?>"
                      action="ajax.php?c=Cms.Mediathek.uploadImage&amp;key=<?php echo $key ?>" ></form>
                    
                    <div 
                      style="position:absolute;top:70px;left:70px;height:330px; width:330px;border: 1px solid black;" onclick="$S('#wgt-upload-image-cms_mediathek-<?php echo $key ?>').click();" >
                      Klick to upload

                    </div>
                    
                    <input 
                      type="file" 
                      name="hans" 
                      class="asgd-wgt-form-image-cms_mediathek-<?php echo $key ?>"
                      id="wgt-upload-image-cms_mediathek-<?php echo $key ?>" 
                      style="position:absolute;top:70px;left:70px;height:330px; width:330px;opacity: 0.1;"
                      onchange="$R.form('wgt-form-image-cms_mediathek-<?php echo $key ?>');"  />

                  <div class="wgt-clear" ></div>
                </div>
            
              </div>
            
          </div>
          <div class="bw3 right" >
            <div class="right">
              <span>Search</span> 
              <input 
                type="text" 
                name="free_search" 
                id="wgt-inp-search-cms_mediathek-image-<?php echo $key ?>" 
                class="wcm wcm_req_search medium wgt-no-save fparam-wgt-form-search-cms_mediathek-<?php echo $key ?>" />
              <button class="wgt-button append" id="wgt-image-search-button">
                <img src="../icons/default/xsmall/control/search.png" class="icon xsmall">
              </button>
              
              <form
                id="wgt-form-search-cms_mediathek-<?php echo $key ?>"
                action="ajax.php?c=Cms.Mediathek.searchImage&amp;key=<?php echo $key ?>"
              ></form>
              
            </div>
          </div>
        </div>
        
        <div class="wgt-grid full" id="wgt-grid-mediathek-image-<?php echo $key ?>" >
          <table class="wcm wcm_widget_grid full" id="wgt-grid-mediathek-image-<?php echo $key ?>-table" >
            <thead>
              <tr>
                <th class="pos" style="width:30px;" >Pos</th>
                <th style="width:120px;" >Image</th>
                <th>Description</th>
                <th style="width:120px;" >Author</th>
                <th style="width:60px;" >Nav</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach( $images as $pos => $img ){ ?>
              <tr>
                <td valign="top" class="pos" ><?php echo $pos +1 ?></td>
                <td valign="top"  >
                  <img 
                    onclick="$S('#<?php echo $editorId ?>').tinymce().execCommand('mceInsertContent',false,'<img src=\'<?php echo $img['src']; ?>\' />');" 
                    src="<?php echo $img['src']; ?>"
                    title="<?php echo $img['title']; ?>"
                    alt="<?php echo $img['label']; ?>"  /></td>
                <td valign="top" >
                  <span><?php echo $img['name']; ?></span> <span><?php echo $img['type']; ?></span><br />
                  <p>
                    <?php echo $img['description']; ?>
                  </p>
                  <div class="wgt-menu bar" >
                    <ul>
                      <?php 
                        $tmp = array();  
                        foreach( $img['dimensions'] as $res => $data )
                        {
                          $tmp[] = '<li><a href="#" onclick="$S(\'#'.$editorId.'\').tinymce().execCommand(\'mceInsertContent\',false,\'<img src=\\\''.$data[1].'\\\' />\');"  >'.$data[0].' : '.$res.'</a></li>';
                        }
                        
                        echo implode( '<li> | </li>',$tmp  );
                      ?>
                    </ul>
                  </div>
                </td>
                <td valign="top" >
                  <?php echo $img['author']; ?><br />
                  <?php echo $img['created']; ?><br />
                  <?php echo $img['licence']; ?>
                </td>
                <td valign="top" >
                  <button class="wgt-button" >edit</button>
                  <button class="wgt-button" >delete</button>
                </td>
              </tr>
              <?php } ?>
            
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Videos -->
      <div id="wgt-tab-mediathek-project_data-video"  title="Videos (6)"  class="wgt_tab bh42 wgt-tab-mediathek-project_data">
        <div class="wgt-panel title" >
          <h3 class="head" >Videos</h3>
          <div class="inline" >
            <button class="wcm wgt-button wcm_ui_dropform" id="wgt-dropform-fubar" >Upload</button>
          </div>
          <div class="bw3 right" >
            <div class="right">
              <input type="text" class="medium" />
              <button class="wgt-button append" id="wgt-video-search-button">
                <img src="../icons/default/xsmall/control/search.png" class="icon xsmall">
              </button>
            </div>
          </div>
        </div>
        <div class="wgt-grid full" id="wgt-grid-mediathek-video" >
          <table class="wcm wcm_widget_grid full" id="wgt-grid-mediathek-video-table" >
            <thead>
              <tr>
                <th class="pos" style="width:30px;" >Pos</th>
                <th style="width:120px;" >Video</th>
                <th>Description</th>
                <th style="width:120px;" >Author</th>
                <th style="width:90px;" >Created</th>
                <th style="width:60px;" >Nav</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td valign="top" class="pos" >1</td>
                <td valign="top"  ><image src="../files/images/video_small.png" /></td>
                <td valign="top" >fuu</td>
                <td valign="top" >Hans</td>
                <td valign="top" >2012-12-12</td>
                <td valign="top" ><button class="wgt-button" >fu</button></td>
              </tr>
              <tr>
                <td valign="top" class="pos" >2</td>
                <td valign="top"  ><image src="../files/images/video_small.png" /></td>
                <td valign="top" >fuu</td>
                <td valign="top" >Hans</td>
                <td valign="top" >2012-12-12</td>
                <td valign="top" ><button class="wgt-button" >fu</button></td>
              </tr>
              <tr>
                <td valign="top" class="pos" >3</td>
                <td valign="top"  ><image src="../files/images/video_small.png" /></td>
                <td valign="top" >fuu</td>
                <td valign="top" >Hans</td>
                <td valign="top" >2012-12-12</td>
                <td valign="top" ><button class="wgt-button" >fu</button></td>
              </tr>
              <tr>
                <td valign="top" class="pos" >4</td>
                <td valign="top"  ><image src="../files/images/video_small.png" /></td>
                <td valign="top" >fuu</td>
                <td valign="top" >Hans</td>
                <td valign="top" >2012-12-12</td>
                <td valign="top" ><button class="wgt-button" >fu</button></td>
              </tr>
              <tr>
                <td valign="top" class="pos" >5</td>
                <td valign="top"  ><image src="../files/images/video_small.png" /></td>
                <td valign="top" >fuu</td>
                <td valign="top" >Hans</td>
                <td valign="top" >2012-12-12</td>
                <td valign="top" ><button class="wgt-button" >fu</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="wgt-tab-mediathek-project_data-document"  title="Documents (7)"  class="wgt_tab bh42 wgt-tab-mediathek-project_data">
        Documents
      </div>

    </div>
    <div class="wgt-clear xxsmall" ></div>
  </div>
  <!-- End Mediathek -->

  <!-- Window -->
  <div title="Image Editor" style="display:none;" id="wgt-mediathek-<?php echo $key ?>-image-dialog"  >
  
    <fieldset>
      <div id="wgt-box-input-mediathek-<?php echo $key ?>-image_src-box" class="wgt_box input">
        <label for="wgt-box-wgt-input" class="wgt-label">Src</label>
        <div class="wgt-input medium"><input 
          type="text" 
          value="" 
          class="large" 
          id="wgt-box-input-mediathek-<?php echo $key ?>-image_src" 
          name="image[src]" /></div>
        <div class="wgt-clear tiny">&nbsp;</div>
      </div>
      <div id="wgt-box-input-mediathek-<?php echo $key ?>-image_title-box" class="wgt_box input">
        <label for="wgt-box-wgt-input" class="wgt-label">Title</label>
        <div class="wgt-input medium"><input 
          type="text" 
          value="" 
          class="large" 
          id="wgt-box-input-mediathek-<?php echo $key ?>-image_title" 
          name="input[title]" /></div>
        <div class="wgt-clear tiny">&nbsp;</div>
      </div>
      <div id="wgt-box-input-mediathek-<?php echo $key ?>-image_alt-box" class="wgt_box input">
        <label for="wgt-box-wgt-input" class="wgt-label">Alt</label>
        <div class="wgt-input medium"><input 
          type="text" 
          value="" 
          class="large" 
          id="wgt-box-input-mediathek-<?php echo $key ?>-image_alt" 
          name="input[alt]" /></div>
        <div class="wgt-clear tiny">&nbsp;</div>
      </div>
      
    </fieldset>
    
    <fieldset>
    
      <div id="wgt-box-input-mediathek-<?php echo $key ?>-image_id-box" class="wgt_box input">
        <label for="wgt-box-wgt-input" class="wgt-label">Id</label>
        <div class="wgt-input medium"><input 
          type="text" 
          value="" 
          class="large" 
          id="wgt-box-input-mediathek-<?php echo $key ?>-image_id" 
          name="input[id]" /></div>
        <div class="wgt-clear tiny">&nbsp;</div>
      </div>
    
      <div id="wgt-box-input-mediathek-<?php echo $key ?>-image_class-box" class="wgt_box input">
        <label for="wgt-box-wgt-input" class="wgt-label">Class</label>
        <div class="wgt-input medium"><input 
          type="text" 
          value="" 
          class="large" 
          id="wgt-box-input-mediathek-<?php echo $key ?>-image_class" 
          name="input[class]" /></div>
        <div class="wgt-clear tiny">&nbsp;</div>
      </div>

      <div id="wgt-box-input-mediathek-<?php echo $key ?>-image_style-box" class="wgt_box input" >
        <label for="wgt-box-wgt-input" class="wgt-label" >Style</label>
        <div class="wgt-input medium" ><textarea 
          class="large medium-height" 
          id="wgt-box-input-mediathek-<?php echo $key ?>-image_style" 
          name="input[alt]" ></textarea></div>
        <div class="wgt-clear tiny">&nbsp;</div>
      </div>
      
    </fieldset>
    
  </div>


  
  <textarea name="cms" wgt_mediathek="wgt-mediathek-<?php echo $key ?>" wgt_mediakey="<?php echo $key ?>" id="wgt-wysiwyg-cms" class="wcm wcm_ui_wysiwyg" >Cms</textarea>
  <var id="wgt-wysiwyg-cms-cfg-wysiwyg" >{"mode":"cms"}</var>
  
</div>


