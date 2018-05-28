using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AspNetCoreSpa.Web.Extensions
{
    public static class ModelStateExtensions
    {
        /// <summary>
        /// Returns a Key/Value pair with all the errors in the model
        /// according to the data annotation properties.
        /// </summary>
        /// <param name="errDictionary"></param>
        /// <returns>
        /// Key: Name of the property
        /// Value: The error message returned from data annotation
        /// </returns>
        public static IEnumerable<string> GetModelErrors(this ModelStateDictionary errDictionary)
        {
            var errors = errDictionary.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage);

            return errors;
        }

        public static Dictionary<string, string> GetModelErrorsWithKeys(this ModelStateDictionary errDictionary)
        {
            var errors = new Dictionary<string, string>();
            errDictionary.Where(k => k.Value.Errors.Count > 0).ToList().ForEach(i =>
            {
                var er = string.Join(", ", i.Value.Errors.Select(e => e.ErrorMessage).ToArray());
                errors.Add(i.Key, er);
            });
            return errors;
        }

    }
}
