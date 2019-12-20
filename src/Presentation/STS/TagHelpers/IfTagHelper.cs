using Microsoft.AspNetCore.Razor.TagHelpers;

namespace AspNetCoreSpa.STS.TagHelpers
{
    public class IfTagHelper : TagHelper
    {
        [HtmlAttributeName("show")]
        public bool Show { get; set; } = true;

        [HtmlAttributeName("hide")]
        public bool Exclude { get; set; } = false;

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            // Always strip the outer tag name as we never want <if> to render
            output.TagName = null;

            if (Show && !Exclude)
            {
                return;
            }

            output.SuppressOutput();
        }
    }
}
