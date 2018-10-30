using AspNetCoreSpa.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AspNetCoreSpa.Web.Filters
{
    public class ModelValidationFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!filterContext.ModelState.IsValid)
            {
                if (filterContext.HttpContext.Request.Method == "GET")
                {
                    var result = new BadRequestResult();
                    filterContext.Result = result;
                }
                else
                {
                    var result = new ContentResult();
                    string content = Helpers.JsonSerialize(new ApiError(filterContext.ModelState));
                    result.Content = content;
                    result.ContentType = "application/json";

                    filterContext.HttpContext.Response.StatusCode = 400;
                    filterContext.Result = result;
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
        }
    }
}